Deploying this `frontend` (Vite + React) to Vercel

Quick overview

- This project is a static SPA built with Vite. The `frontend/package.json` already defines `build` → `vite build` which outputs to `dist`.
- We've added `frontend/vercel.json` so when you import this repository into Vercel and set the project root to `frontend`, Vercel will run `npm run build` and serve the built `dist` directory as a static site.

Deploy via Vercel dashboard (recommended)

1. Push your repository to GitHub (if not already).
2. Open https://vercel.com and sign in with GitHub.
3. Click "New Project" → "Import Git Repository" → select `aakash2410/IndiaAI100`.
4. In the Import settings set **Root Directory** to `frontend` (important).
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Add any environment variables (if you need to expose API keys, add them in Vercel's dashboard as project secrets).
8. Click Deploy.

Deploy via Vercel CLI (alternative)

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# login
vercel login

# from repo root
cd frontend
# first-time: link to your Vercel account / project
vercel
# to deploy a production build
vercel --prod
```

Notes and suggestions

- If you want automated deploys on every push, connect the GitHub repo and enable automatic deployments in the Vercel project settings.
- If the Vercel import doesn't auto-detect the project root, set it explicitly to `frontend` and the build command to `npm run build`.
- Make sure `venv/` is removed from the repository (it was added earlier) — large files in repo can slow deploys; we added `.gitignore` but if `venv` is already committed you'll want to remove it from the repo history.

Troubleshooting

- If assets 404 after deploy, verify `base` in `vite.config.js` (should usually be `/` for root deployments). If deploying under a subpath, set `base: '/your-subpath/'`.
- If you want preview builds for PRs, enable Preview Deployments in Vercel.

If you want, I can:
- Create the Vercel project from the command line (requires your Vercel login token), or
- Walk you through the GitHub→Vercel import step by step and verify settings.
