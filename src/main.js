
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Text Encryptor</h1>
    <div class="card">
      <label for="inputText">Enter text to encrypt:</label><br>
      <textarea id="inputText" rows="3" cols="40" placeholder="Type your text here..."></textarea><br><br>
      <button id="encryptBtn">Encrypt</button>
    </div>
    <div class="card">
      <label for="outputHash">Encrypted (12-char hash):</label><br>
      <input id="outputHash" type="text" readonly style="width: 300px;" />
      <button id="copyBtn">Copy</button>
    </div>
  </div>
`

function hash12(str) {
  // Simple irreversible hash: combine FNV-1a and base62 encoding
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  // Convert to base62
  const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let out = '';
  let n = Math.abs(hash);
  for (let i = 0; i < 12; i++) {
    out += base62[n % 62];
    n = Math.floor(n / 62);
  }
  return out;
}

document.getElementById('encryptBtn').onclick = function() {
  const input = document.getElementById('inputText').value;
  document.getElementById('outputHash').value = input ? hash12(input) : '';
};

document.getElementById('copyBtn').onclick = function() {
  const output = document.getElementById('outputHash');
  output.select();
  document.execCommand('copy');
};
