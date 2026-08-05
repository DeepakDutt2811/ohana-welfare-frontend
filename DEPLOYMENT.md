# Deploying Ohana Welfare Foundation

Stack: **Vercel** (frontend) + **Render** (backend) + **Neon** (Postgres). All three have free
tiers sufficient for a low-traffic NGO site — see cost notes at the bottom.

## 1. Database — Neon

1. Create a free account at [neon.tech](https://neon.tech) and a new project (e.g. `ohana`).
2. Neon gives you a connection string like:
   `postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/ohana?sslmode=require`
   — copy it, you'll need it in step 2.
3. Create the tables. From your machine (with `psql` installed), run:
   ```bash
   psql "<your Neon connection string>" -f backend/migrations/002_create_tables.sql
   ```
   (Skip `001_create_database.sql` — Neon already created the database for you.)

## 2. Backend — Render

1. Push this repo to GitHub (Render deploys from a Git repo).
2. In [Render](https://render.com), click **New > Blueprint**, point it at the repo — it will
   read [render.yaml](render.yaml) and create the `ohana-backend` web service automatically
   (free plan, rootDir `backend`).
3. In the service's **Environment** tab, set the secret values (these were left blank in
   `render.yaml` on purpose — never commit them):
   - `DATABASE_URL` — the Neon connection string from step 1
   - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — from the Razorpay dashboard
   - `CORS_ORIGINS` — your Vercel URL, added in step 3 below (you can come back and set this
     after step 3 gives you the domain)
4. Deploy. Render gives you a URL like `https://ohana-backend.onrender.com` — you'll need it
   for the frontend's env var next. Confirm it's alive: `curl https://ohana-backend.onrender.com/health`
   should return `{"status":"ok"}`.

_No Dockerfile setup needed for Render — the Blueprint uses Render's native Python runtime. A
`backend/Dockerfile` is included if you'd rather deploy the backend on Railway/Fly/another
Docker-based host instead._

## 3. Frontend — Vercel

1. In [Vercel](https://vercel.com), **New Project**, import the same GitHub repo. Vercel
   auto-detects the Vite framework preset (build command `npm run build`, output `dist`) — leave
   the defaults.
2. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = your Render backend URL from step 2 (e.g.
     `https://ohana-backend.onrender.com`)
3. Deploy. Vercel gives you a URL like `https://ohana-welfare.vercel.app`.
4. Go back to Render and set `CORS_ORIGINS` to that Vercel URL (and any custom domain you add
   later), then redeploy the backend so the CORS change takes effect.

`vercel.json` in the repo root is already configured to rewrite all routes to `index.html`, which
`react-router-dom`'s `BrowserRouter` needs for direct links like `/donate` to work.

## 4. Post-deploy checklist

- [ ] Visit the Vercel URL, click through Home/About/Causes/Contact/Donate
- [ ] Submit the Contact form and confirm a row appears in the `contacts` table (Neon dashboard
      has a SQL editor, or `psql "<connection string>" -c "SELECT * FROM contacts;"`)
- [ ] Submit a test donation — Razorpay test card `4111 1111 1111 1111`, any future expiry, any
      CVV, OTP `1234` — and confirm the `donations` row's `payment_status` becomes `paid`
- [ ] When ready for real donations, swap `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` in Render for
      your **live** Razorpay keys (test keys never process real money)

## Cost summary

| Service | Free tier | When you'd pay |
|---|---|---|
| Vercel | Generous, effectively free for this site | Custom team features, high traffic |
| Render | Free web service, but sleeps after ~15 min idle (30-60s cold start) | $7/mo to avoid the sleep/cold start |
| Neon | 0.5GB storage, plenty for donations + contacts | Growth plan if you outgrow 0.5GB |

Total to start: **$0/month**. If the Render cold start bothers donors, upgrading just that one
service to $7/mo removes it — everything else stays free.
