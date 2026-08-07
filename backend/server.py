from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Admin auth
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'alisson2026')
# In-memory token store (simple session)
_active_tokens: set = set()

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")


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


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not x_admin_token or x_admin_token not in _active_tokens:
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
    return rsvp


@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    token = secrets.token_urlsafe(32)
    _active_tokens.add(token)
    return AdminLoginResponse(token=token)


@api_router.get("/admin/rsvps", response_model=List[RSVP])
async def list_rsvps(_: bool = Depends(require_admin)):
    items = await db.rsvps.find().sort("created_at", -1).to_list(2000)
    return [RSVP(**{k: v for k, v in it.items() if k != "_id"}) for it in items]


@api_router.get("/admin/stats")
async def stats(_: bool = Depends(require_admin)):
    items = await db.rsvps.find().to_list(5000)
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
    if x_admin_token in _active_tokens:
        _active_tokens.discard(x_admin_token)
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
