# tipo — portfolio + demo sites

Static site (HTML/CSS/JS, no build step). Personal portfolio that links to demo work.

```
/                 → portfolio landing (index.html), bilingual EN/RU, B&W minimal
/platform/        → drope — flagship case study (5 product screens)
/barbershop/      → RAVEN barbershop demo (dark)
/salon/           → FLEUR beauty salon demo (light)
/social/post-kit.html → generates the 7 Instagram tiles (1080×1080 PNG)
```

## Deploy to GitHub Pages

```bash
git add .
git commit -m "tipo portfolio + demos"
git push
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root** → Save.
Live in ~1 min. `.nojekyll` is included so folders are served as-is.

The post kit (`/social/post-kit.html`) is a local tool for generating Instagram images — it doesn't need to be public, but it's harmless if it is.

## Personalise before sending to clients

In `index.html`:
- `t.me/yourhandle` → your Telegram
- `wa.me/0000000000` → your WhatsApp number (digits, international)
- `formspree.io/f/yourformid` → your Formspree form id (free)
- Instagram already points to `instagram.com/tipo.sites`; email to `shtyh07@gmail.com`

The two demo sites use placeholder addresses/phones (Berlin / Vienna) — change per client or leave as generic demos. They're tagged **Concept**; the platform is tagged **Live** (real product, private source).

## Custom domain (optional)
A real domain (e.g. `tipo.sites` if available as a domain, or `tipo.studio`) in cold outreach looks far more credible than a `github.io` link. Buy it, add a `CNAME` file, point DNS to GitHub Pages.
