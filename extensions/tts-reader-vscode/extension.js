const vscode = require('vscode');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

let activeSpeech;
let temporaryAudioPath;
let speechId = 0;

const piperDirectory = path.join(os.homedir(), '.local', 'share', 'tts-reader-piper');
const piperBinary = path.join(piperDirectory, 'bin', 'piper');
const piperModel = path.join(piperDirectory, 'voices', 'es_MX-claude-high.onnx');

function selectedText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) return '';
  return editor.document.getText(editor.selection).trim();
}

function stopSpeaking() {
  speechId += 1;
  if (activeSpeech && !activeSpeech.killed) {
    activeSpeech.kill();
  }
  activeSpeech = undefined;
  if (temporaryAudioPath) {
    fs.rm(temporaryAudioPath, { force: true }, () => {});
    temporaryAudioPath = undefined;
  }
}

function playWithPiper(content, speed) {
  if (!fs.existsSync(piperBinary) || !fs.existsSync(piperModel)) {
    vscode.window.showErrorMessage('Lector TTS: no se encontró la voz neuronal local de Piper.');
    return;
  }

  stopSpeaking();
  const currentSpeechId = ++speechId;
  temporaryAudioPath = path.join(os.tmpdir(), `tts-reader-${Date.now()}.wav`);
  const lengthScale = String((1 / speed).toFixed(2));
  activeSpeech = spawn(piperBinary, [
    '--model', piperModel,
    '--output_file', temporaryAudioPath,
    '--length-scale', lengthScale
  ]);

  activeSpeech.on('error', () => {
    if (currentSpeechId === speechId) {
      vscode.window.showErrorMessage('Lector TTS: no se pudo iniciar la voz neuronal de Piper.');
      stopSpeaking();
    }
  });

  activeSpeech.on('close', (code) => {
    if (currentSpeechId !== speechId || code !== 0 || !temporaryAudioPath) return;
    activeSpeech = spawn('paplay', [temporaryAudioPath]);
    activeSpeech.on('error', () => {
      if (currentSpeechId === speechId) {
        vscode.window.showErrorMessage('Lector TTS: no se pudo reproducir el audio generado.');
        stopSpeaking();
      }
    });
    activeSpeech.on('close', () => {
      if (currentSpeechId === speechId) stopSpeaking();
    });
  });

  activeSpeech.stdin.end(content);
}

function speak(text) {
  const content = text.replace(/\s+/g, ' ').trim();
  if (!content) {
    vscode.window.showInformationMessage('Lector TTS: no hay texto para leer.');
    return;
  }

  stopSpeaking();
  const settings = vscode.workspace.getConfiguration('ttsReader');
  const language = settings.get('language', 'es');
  const speed = Number(settings.get('speed', 1));
  const wordsPerMinute = String(Math.round(175 * speed));

  if (process.platform === 'linux') {
    playWithPiper(content, speed);
    return;
  }

  let command;
  let args;
  let options = {};

  if (process.platform === 'darwin') {
    command = 'say';
    args = ['-r', wordsPerMinute, content];
  } else if (process.platform === 'win32') {
    command = 'powershell.exe';
    args = [
      '-NoProfile',
      '-Command',
      '$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer; $voice.Rate = [int]$env:TTS_READER_RATE; $voice.Speak($env:TTS_READER_TEXT)'
    ];
    options = {
      env: {
        ...process.env,
        TTS_READER_TEXT: content,
        TTS_READER_RATE: String(Math.round((speed - 1) * 5))
      }
    };
  }

  activeSpeech = spawn(command, args, options);
  activeSpeech.on('error', () => {
    activeSpeech = undefined;
    const setupMessage = process.platform === 'linux'
      ? 'Instala espeak-ng y vuelve a intentarlo.'
      : 'No se encontró el motor de voz del sistema.';
    vscode.window.showErrorMessage(`Lector TTS: ${setupMessage}`);
  });
  activeSpeech.on('close', () => {
    activeSpeech = undefined;
  });
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('ttsReader.readSelection', () => {
      const text = selectedText();
      if (!text) {
        vscode.window.showInformationMessage('Selecciona una respuesta o usa “Lector TTS: Leer texto copiado”.');
        return;
      }
      speak(text);
    }),
    vscode.commands.registerCommand('ttsReader.readClipboard', async () => {
      speak(await vscode.env.clipboard.readText());
    }),
    vscode.commands.registerCommand('ttsReader.stop', stopSpeaking),
    { dispose: stopSpeaking }
  );
}

function deactivate() {
  stopSpeaking();
}

module.exports = { activate, deactivate };
