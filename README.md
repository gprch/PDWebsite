# Elsteins — site + CMS

This is your Elsteins design rebuilt as a real Astro site, with posts stored
as Markdown files so you can add new ones through a simple dashboard instead
of editing code.

## 1. Try it locally (optional but recommended)

```
npm install
npm run dev
```

Open the printed localhost URL — you should see the homepage with the three
sample posts already in `src/content/posts/`.

## 2. Put it on GitHub

Create a new repo on GitHub, then from this folder:

```
git init
git add .
git commit -m "Elsteins site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/elsteins-site.git
git push -u origin main
```

## 3. Deploy on Netlify

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import
   an existing project** → pick your GitHub repo.
2. Build command: `npm run build`  ·  Publish directory: `dist`
3. Click **Deploy**. Your site goes live at a `*.netlify.app` URL immediately.

## 4. Turn on the CMS dashboard

The admin panel is already built at `/admin` — you just need to switch on
login for it (one-time, ~2 minutes):

1. In your Netlify site dashboard → **Site configuration → Identity** → **Enable Identity**.
2. Under Identity **Registration**, set it to **Invite only** (so only you can log in).
3. Under Identity → **Services**, enable **Git Gateway**.
4. Go to **Identity** tab (top nav) → **Invite users** → invite your own email.
   Accept the invite email, set a password.
5. Visit `https://your-site.netlify.app/admin` and log in.

From then on, click **New Post**, fill in the fields, hit **Publish** — Decap
CMS commits a new Markdown file to your GitHub repo, and Netlify automatically
rebuilds the live site with the new post.

## 5. Connect your own domain

Netlify → **Domain management** → **Add a custom domain**, then follow the
DNS instructions for whichever registrar you bought the domain from.

## Editing the design

- Colors, fonts, borders: `src/styles/global.css`
- Header/nav/footer: `src/layouts/Layout.astro`
- Homepage layout: `src/pages/index.astro`
- Single post layout: `src/pages/posts/[slug].astro`

Everything here is plain HTML/CSS inside `.astro` files — no build tooling
knowledge needed beyond `npm run dev` to preview changes.
