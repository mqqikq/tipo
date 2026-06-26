// Generates the link-preview (Open Graph) image: 1200x630 PNG at repo root /og.png
// Run: node social/gen-og.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.join(__dirname, '..', 'og.png');
const TMP = path.join(os.tmpdir(), 'tipo-og');
fs.mkdirSync(TMP, { recursive: true });

const FONTS = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Inter:wght@400;500&display=swap';
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>*{box-sizing:border-box;}html,body{margin:0;padding:0;}</style></head><body>
<div style="width:1200px;height:630px;background:#0e0e10;display:flex;flex-direction:column;justify-content:center;padding:96px;">
  <div style="font-family:'Inter Tight';font-weight:600;font-size:150px;letter-spacing:-.05em;color:#ffffff;line-height:1;">tipo</div>
  <div style="font-family:'Inter Tight';font-weight:500;font-size:46px;letter-spacing:-.02em;color:#e8e8e8;margin-top:30px;max-width:20ch;line-height:1.2;">Websites that make small business look expensive.</div>
  <div style="font-family:'Inter';font-weight:400;font-size:26px;color:#8a8a8a;margin-top:42px;letter-spacing:.01em;">tipo.sites &nbsp;·&nbsp; online booking &nbsp;·&nbsp; live in 3–7 days</div>
</div>
</body></html>`;

const htmlPath = path.join(TMP, 'og.html');
const tmpPng = path.join(TMP, 'og.png');
fs.writeFileSync(htmlPath, html, 'utf8');
execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--force-device-scale-factor=1', '--window-size=1200,630',
  '--virtual-time-budget=6000', '--screenshot=' + tmpPng, pathToFileURL(htmlPath).href
], { stdio: 'ignore' });
const buf = fs.readFileSync(tmpPng);
fs.writeFileSync(OUT, buf);
console.log(`og.png  ${buf.readUInt32BE(16)}x${buf.readUInt32BE(20)}  ${Math.round(buf.length/1024)}KB -> ${OUT}`);
