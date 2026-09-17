from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
import asyncio
import requests
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL') or 'mongodb://127.0.0.1:27017'
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME') or 'xv']

# Telegram bot configuration
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID')

# Admin auth
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'alisson2026')
TOKEN_TTL_HOURS = 12


async def _is_valid_token(token: Optional[str]) -> bool:
    if not token:
        return False
    doc = await db.admin_sessions.find_one({"token": token})
    if not doc:
        return False
    created = doc.get("created_at")
    if isinstance(created, datetime):
        age_hours = (datetime.utcnow() - created).total_seconds() / 3600
        if age_hours > TOKEN_TTL_HOURS:
            await db.admin_sessions.delete_one({"token": token})
            return False
    return True

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")


async def _send_telegram_message(text: str) -> None:
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
    }

    def send() -> None:
        try:
            resp = requests.post(url, json=payload, timeout=10)
            resp.raise_for_status()
        except Exception as exc:
            logger.error("Telegram message failed: %s", exc)

    await asyncio.to_thread(send)


# --- Models ---
class RSVPCreate(BaseModel):
    name: str
    passes: int = Field(ge=1)
    message: Optional[str] = None


class RSVP(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    passes: int
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AdminLogin(BaseModel):
    password: str


class AdminLoginResponse(BaseModel):
    token: str


async def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not await _is_valid_token(x_admin_token):
        raise HTTPException(status_code=401, detail="No autorizado")
    return True


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "XV Años API"}


@api_router.post("/rsvp", response_model=RSVP)
async def create_rsvp(payload: RSVPCreate):
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="El nombre es obligatorio")
    if payload.passes < 1:
        raise HTTPException(status_code=400, detail="Mínimo 1 pase")
    rsvp = RSVP(name=name, passes=payload.passes, message=(payload.message or None))
    doc = rsvp.dict()
    await db.rsvps.insert_one(doc)

    if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID:
        telegram_text = (
            f"✅ Nueva confirmación de RSVP\n"
            f"Nombre: {name}\n"
            f"Pases: {payload.passes}\n"
            f"Mensaje: {payload.message or '—'}\n"
            f"Fecha: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}"
        )
        await _send_telegram_message(telegram_text)

    return rsvp


@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    token = secrets.token_urlsafe(32)
    await db.admin_sessions.insert_one({"token": token, "created_at": datetime.utcnow()})
    return AdminLoginResponse(token=token)


@api_router.get("/admin/rsvps", response_model=List[RSVP])
async def list_rsvps(_: bool = Depends(require_admin)):
    items = await db.rsvps.find().sort("created_at", -1).to_list(2000)
    return [RSVP(**{k: v for k, v in it.items() if k != "_id"}) for it in items]


@api_router.get("/admin/stats")
async def stats(_: bool = Depends(require_admin)):
    items = await db.rsvps.find({}, {"passes": 1, "_id": 0}).to_list(5000)
    total_conf = len(items)
    total_passes = sum(int(it.get("passes", 0)) for it in items)
    return {"total_confirmations": total_conf, "total_passes": total_passes}


@api_router.delete("/admin/rsvps/{rsvp_id}")
async def delete_rsvp(rsvp_id: str, _: bool = Depends(require_admin)):
    res = await db.rsvps.delete_one({"id": rsvp_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No encontrado")
    return {"ok": True}


@api_router.post("/admin/logout")
async def admin_logout(_: bool = Depends(require_admin), x_admin_token: Optional[str] = Header(default=None)):
    if x_admin_token:
        await db.admin_sessions.delete_one({"token": x_admin_token})
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
