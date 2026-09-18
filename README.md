# GlobalTradeHub — web app (Vite + React)

This is the real, deployable version of the website. Unlike the claude.ai
preview link, a site built with this project and deployed to Vercel can make
normal network requests to Supabase and to the Twilio backend — there is no
platform sandbox blocking outbound calls here.

## Deploy on Vercel (recommended, free)

1. Push this folder's contents (`package.json`, `vite.config.js`, `index.html`,
   `src/App.jsx`, `src/main.jsx`) to the root of your `GlobalTradeHub` GitHub
   repository, replacing the existing loose `GlobalTradeHub.jsx` file.
2. Go to https://vercel.com and sign in with GitHub.
3. Click **Add New... → Project**, select the `GlobalTradeHub` repository.
4. Vercel auto-detects Vite — leave the default build settings
   (Build Command: `vite build`, Output Directory: `dist`).
5. Click **Deploy**. After ~1 minute you'll get a public URL like
   `https://global-trade-hub.vercel.app` — this is your real, permanent site.

Every time you push a change to GitHub, Vercel automatically rebuilds and
redeploys — same workflow as the Render backend.

## Run locally first (optional, to test before deploying)

```bash
npm install
npm run dev
```

Opens the site at `http://localhost:5173` with hot-reload.
