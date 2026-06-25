// Generates the Instagram post tiles as real 1080x1080 PNG files using headless Chrome.
// Run:  node social/gen-posts.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.join(__dirname, 'posts');
const TMP = path.join(os.tmpdir(), 'tipo-posts');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const FONTS = 'https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Cormorant+Garamond:ital,wght@0,600;1,500&family=Inter+Tight:wght@500;600&family=Inter:wght@400;500&display=swap';
const box = 'width:1080px;height:1080px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;';

const tiles = [
  { name: '01-raven', html:
    `<div style="${box}background:#15130f;">
      <div style="font-family:'Oswald';font-weight:700;font-size:172px;letter-spacing:6px;color:#d8a24a;line-height:1;">RAVEN</div>
      <div style="width:90px;height:3px;background:#d8a24a;margin:46px 0;"></div>
      <div style="font-family:'Inter';font-size:30px;letter-spacing:.32em;text-transform:uppercase;color:#9b9388;">Barbershop &middot; website</div>
    </div>` },
  { name: '02-fleur', html:
    `<div style="${box}background:#f1e9db;">
      <div style="font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:200px;color:#b5705a;line-height:1;">Fleur</div>
      <div style="width:90px;height:3px;background:#c98b86;margin:42px 0;"></div>
      <div style="font-family:'Inter';font-size:30px;letter-spacing:.32em;text-transform:uppercase;color:#8d8175;">Beauty salon &middot; website</div>
    </div>` },
  { name: '03-drope', html:
    `<div style="${box}background:#0e0e10;">
      <div style="font-family:'Inter Tight';font-weight:600;font-size:200px;letter-spacing:-.04em;color:#fff;line-height:1;">drope</div>
      <div style="width:90px;height:3px;background:#fff;margin:46px 0;"></div>
      <div style="font-family:'Inter';font-size:30px;letter-spacing:.32em;text-transform:uppercase;color:#8a8a92;">Marketplace &middot; product design</div>
    </div>` },
  { name: '04-statement', html:
    `<div style="${box}background:#ffffff;padding:90px;">
      <div style="font-family:'Inter Tight';font-weight:600;font-size:104px;letter-spacing:-.04em;color:#0a0a0a;line-height:1.04;">Websites<br>that book<br>clients.</div>
      <div style="font-family:'Inter';font-size:30px;color:#666;margin-top:44px;">online booking built in</div>
    </div>` },
  { name: '05-whatido', html:
    `<div style="${box}background:#1c1916;padding:90px;">
      <div style="font-family:'Inter';font-size:28px;letter-spacing:.3em;text-transform:uppercase;color:#d8a24a;margin-bottom:46px;">What I do</div>
      <div style="font-family:'Inter Tight';font-weight:500;font-size:82px;letter-spacing:-.02em;color:#efe9df;line-height:1.12;">From an Instagram<br>page to a site that<br>takes bookings.</div>
    </div>` },
  { name: '06-cta', html:
    `<div style="${box}background:#efe7d8;">
      <div style="font-family:'Inter Tight';font-weight:600;font-size:150px;letter-spacing:-.03em;color:#1c1916;line-height:1;">3&ndash;7<br>days</div>
      <div style="font-family:'Inter';font-size:34px;color:#8a6f54;margin-top:44px;">from first message to live</div>
    </div>` },
  { name: 'avatar', html:
    `<div style="${box}background:#0e0e10;">
      <div style="font-family:'Inter Tight';font-weight:600;font-size:320px;letter-spacing:-.05em;color:#fff;line-height:.8;">tipo</div>
    </div>` },
];

const page = (inner) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#fff;}</style></head><body>${inner}</body></html>`;

let ok = 0;
for (const t of tiles) {
  const htmlPath = path.join(TMP, t.name + '.html');
  const tmpPng = path.join(TMP, t.name + '.png');
  fs.writeFileSync(htmlPath, page(t.html), 'utf8');
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--window-size=1080,1080',
    '--default-background-color=00000000', '--virtual-time-budget=6000',
    '--screenshot=' + tmpPng, pathToFileURL(htmlPath).href
  ], { stdio: 'ignore' });
  const buf = fs.readFileSync(tmpPng);
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  fs.writeFileSync(path.join(OUT, t.name + '.png'), buf);
  console.log(`${t.name}.png  ${w}x${h}  ${Math.round(buf.length/1024)}KB`);
  ok++;
}
console.log(`done: ${ok} tiles -> ${OUT}`);
