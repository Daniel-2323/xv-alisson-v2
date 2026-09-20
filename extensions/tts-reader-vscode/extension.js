const vscode = require('vscode');
const { spawn } = require('child_process');

let activeSpeech;

function selectedText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) return '';
  return editor.document.getText(editor.selection).trim();
}

function stopSpeaking() {
  if (activeSpeech && !activeSpeech.killed) {
    activeSpeech.kill();
  }
  activeSpeech = undefined;
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
  } else {
    command = 'espeak-ng';
    args = ['-v', language, '-s', wordsPerMinute, content];
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
