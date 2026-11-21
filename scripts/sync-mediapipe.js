import fs from 'node:fs';
import path from 'node:path';

const WASM_SOURCE = 'node_modules/@mediapipe/tasks-vision/wasm';
const WASM_DEST = 'public/wasm';

// Ensure directories exist
if (!fs.existsSync(WASM_DEST)) {
  fs.mkdirSync(WASM_DEST, { recursive: true });
}

// Copy WASM files
if (fs.existsSync(WASM_SOURCE)) {
  const files = fs.readdirSync(WASM_SOURCE);
  for (const file of files) {
    fs.copyFileSync(path.join(WASM_SOURCE, file), path.join(WASM_DEST, file));
  }
  console.log('MediaPipe WASM files synced.');
} else {
  console.error('MediaPipe WASM source not found. Run npm install.');
}
