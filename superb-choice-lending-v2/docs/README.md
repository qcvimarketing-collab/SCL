# Superb Choice Lending — Production Website

Premium institutional commercial finance brokerage website. Built with static HTML, Vercel hosting, and Supabase backend.

> _Integritas · Diligentia · Fiducia_

---

## 📁 Project Structure

```
scl-v2/
├── index.html                    # Landing page
├── working-capital.html          # 8 loan-type pages
├── term-loan.html                #
├── line-of-credit.html           #
├── mca.html                      #
├── equipment-financing.html      #
├── factoring.html                #
├── ar-financing.html             #
├── commercial-real-estate.html   #
├── apply.html                    # Loan-type selector
├── contact.html                  # Consultation form
├── about.html                    # About the firm
├── blog.html                     # Blog index (Supabase-driven)
├── blog-post.html                # Blog post template
├── privacy.html                  # Legal pages
├── terms.html                    #
├── disclosures.html              #
├── sitemap.xml                   # SEO
├── robots.txt                    #
├── schema.sql                    # Supabase DB setup
├── assets/
│   ├── css/scl.css               # Design system (single CSS file)
│   ├── img/logo-horizontal.png   # Brand mark
│   └── js/
│       ├── scl-core.js           # Shared utilities (toast, nav, reveal)
│       ├── partials.js           # Shared header & footer (injected)
│       ├── validation.js         # US-standard form validation
│       ├── supabase-client.js    # DB wrapper (with offline fallback)
│       ├── seo.js                # JSON-LD schema generators
│       ├── loans-catalog.js      # All 8 loan products (content + FAQs)
│       └── loan-page.js          # Renders any loan page from catalog
└── docs/
    └── README.md                 # This file
```

---

## 🚀 Quick Start (Local)

The site is pure HTML/CSS/JS — no build step. Just open `index.html` in a browser.

For a proper local dev server (so absolute paths and Supabase work correctly):

```bash
cd scl-v2
python3 -m http.server 8000
# Then visit http://localhost:8000
```

Or with Node:
```bash
npx serve .
```

The site **works offline** without Supabase configured — blog posts use demo content, and form submissions log to the browser console with a success simulation.

---

## ☁️ Deploying to Vercel

### Method A: GitHub + Vercel (recommended — easy ongoing edits)

1. Create a new GitHub repo and push this folder:
   ```bash
   cd scl-v2
   git init && git add . && git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/scl-website.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo.
3. **Framework Preset:** Other (static).
4. **Build Command:** _(leave empty)_
5. **Output Directory:** _(leave empty — root is fine)_
6. Click **Deploy**. Site goes live in ~30 seconds.

Every `git push` will auto-deploy the new version.

### Method B: Vercel CLI

```bash
npm install -g vercel
cd scl-v2
vercel --prod
```

### Custom Domain

In your Vercel dashboard → Project Settings → Domains → add `superbchoicelending.com`. Update DNS records as instructed by Vercel (one A record or CNAME).

---

## 🗄️ Setting Up Supabase (Backend)

The site works offline, but to enable real form submissions and blog management:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → Start your project (free).
2. Name your project, set a database password (save it), pick a region near your users.
3. Wait ~2 minutes for provisioning.

### 2. Run the Schema

1. In your Supabase dashboard, go to **SQL Editor**.
2. Open `schema.sql` from this project and paste the entire contents.
3. Click **Run**. This creates 4 tables: `applications`, `consultations`, `newsletter_subscribers`, `blog_posts` — plus Row Level Security policies.

### 3. Connect the Site to Supabase

1. In Supabase → **Project Settings → API**.
2. Copy your **Project URL** and **anon/public API key**.
3. Open `assets/js/supabase-client.js`:
   ```js
   const SCL_CONFIG = {
     SUPABASE_URL:      'https://xxxxxxxx.supabase.co',
     SUPABASE_ANON_KEY: 'eyJhbGc...your_anon_key...',
   };
   ```
4. Replace the placeholders. Commit & push. Vercel auto-deploys.

The anon key is **safe to expose** in the browser — Row Level Security policies (set up in `schema.sql`) prevent unauthorized data access.

### 4. Storage Buckets (for blog images)

In Supabase → **Storage** → Create two buckets:

- **`blog-images`** — public read, authenticated write. Used for blog cover images.
- **`uploads`** — private. Used for loan document uploads (future).

### 5. Create an Admin User

To manage blog posts and view submissions:

1. In Supabase → **Authentication → Users** → Add user.
2. Use your work email + a strong password.
3. You can now log into the (forthcoming) admin panel at `/admin.html`.

---

## ✍️ Managing Blog Posts

### Option 1: Supabase Dashboard (recommended for now)

1. Go to your Supabase project → **Table Editor → `blog_posts`**.
2. Click **Insert Row** to create a new post.
3. Required fields: `slug` (URL-friendly, e.g. `dscr-explained`), `title`, `content` (HTML), `status` = `published`, `published_at` = now.
4. Save. The post appears immediately on `/blog.html`.

### Option 2: Custom Admin Panel

A future `/admin.html` page can provide a UI for non-technical editors. For now, the Supabase dashboard is a clean, professional admin UI out of the box.

---

## 📈 SEO / AEO / GEO Foundation

Every page ships with:

- **Unique `<title>` and meta description** (search engine display)
- **Open Graph + Twitter cards** (social sharing previews)
- **Canonical URLs** (avoid duplicate-content penalties)
- **Geo meta tags** (Boca Raton coordinates) for local SEO
- **JSON-LD structured data** auto-injected:
  - `Organization` + `LocalBusiness` + `FinancialService` (every page)
  - `LoanOrCredit` (each loan page)
  - `FAQPage` (each loan page — drives Google's answer panels / AEO)
  - `BreadcrumbList` (every interior page)
  - `Article` (each blog post)
- **Semantic HTML** (`<article>`, `<nav>`, `<main>`, `<section>`)
- **Internal linking** between loan pages and related products
- **`sitemap.xml`** with all URLs
- **`robots.txt`** allowing all crawlers, pointing to sitemap

### Verifying SEO is working

1. **Rich Results Test** — paste a loan page URL into [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — should detect FAQPage, LocalBusiness, LoanOrCredit.
2. **Mobile-Friendly Test** — [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)
3. **PageSpeed Insights** — [pagespeed.web.dev](https://pagespeed.web.dev) — target 90+ on mobile and desktop.

### Submit to Search Engines

After going live:

1. **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console) → Add property → submit sitemap URL.
2. **Bing Webmaster Tools** — [bing.com/webmasters](https://www.bing.com/webmasters) → same.

---

## 🎨 Brand System

Defined in `assets/css/scl.css` as CSS variables:

```css
--forest: #1F4D3A;   /* Primary */
--navy:   #0E2A47;   /* Secondary */
--gold:   #B8893E;   /* Accent */
--ivory:  #F4EFE3;   /* Surface */
```

Fonts: **Cormorant Garamond** (display) + **Inter** (body) — both loaded from Google Fonts.

Brand voice: _Measured. Institutional. Confident without bravado._

---

## ✅ US-Standard Form Validation

Built into `assets/js/validation.js`:

- **Phone** — auto-formats to `(555) 123-4567`
- **EIN** — auto-formats to `XX-XXXXXXX`
- **SSN** — auto-formats to `XXX-XX-XXXX`
- **ZIP** — `12345` or `12345-6789`
- **State** — all 50 states + DC dropdown
- **Email** — RFC-compliant regex
- **Currency** — auto-formats with commas
- **Date of birth** — age 18+ enforced
- **NAICS** — 2–6 digit code

To add validation to any field:

```html
<div class="field">
  <input type="text" id="phone" data-rules="required|phone" data-format="phone" placeholder=" " />
  <label for="phone">Phone</label>
  <div class="field-error"></div>
</div>
```

Available rules: `required`, `email`, `phone`, `ein`, `ssn`, `zip`, `url`, `state`, `naics`, `currency`, `min:N`, `max:N`, `range:MIN:MAX`, `age18`, `pastDate`, `futureOrToday`.

Available formats: `phone`, `ein`, `ssn`, `zip`, `currency`.

---

## 📝 Editing Loan Programs

All loan content lives in **one file**: `assets/js/loans-catalog.js`. Each loan has:

- SEO metadata (title, description, keywords)
- Hero copy
- Loan terms (amount range, term range, speed)
- Highlights (4-item snapshot)
- Overview paragraph
- "Who this is for" list
- Specific form fields (Section 2 of the official application)
- FAQs (drive AEO schema)

Edit this file and all 8 loan pages update automatically.

---

## 🔧 Where to Edit What

| Want to change… | Edit… |
|---|---|
| Brand colors | `assets/css/scl.css` (CSS variables at top) |
| Navigation links | `assets/js/partials.js` (SCL_NAV_LINKS) |
| Footer content | `assets/js/partials.js` (renderFooter) |
| Loan-page content | `assets/js/loans-catalog.js` |
| Form validation | `assets/js/validation.js` |
| SEO schemas | `assets/js/seo.js` |
| Landing page hero | `index.html` |
| Phone / address | `assets/js/seo.js` (SCL_ORG) + `assets/js/partials.js` (footer) |

---

## 🛡️ Production Checklist

Before going live:

- [ ] Replace `https://YOUR_PROJECT.supabase.co` and anon key in `supabase-client.js`
- [ ] Run `schema.sql` in your Supabase SQL editor
- [ ] Create an admin user in Supabase Authentication
- [ ] Update phone number in `assets/js/seo.js` (SCL_ORG.telephone)
- [ ] Update email throughout (`advisors@superbchoicelending.com`)
- [ ] Update physical address in `assets/js/seo.js` (SCL_ORG.address)
- [ ] Verify favicon (`assets/img/logo-horizontal.png`)
- [ ] Set up custom domain in Vercel
- [ ] Submit sitemap to Google Search Console
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) — fix any flags
- [ ] Test all forms (submit, verify in Supabase Table Editor)
- [ ] Test on real mobile devices (not just dev tools)
- [ ] Add Google Analytics or Plausible (optional)

---

## 📞 Support

Questions about the codebase: each file is heavily commented. Start at the file relevant to your change (see the "Where to Edit What" table above).

For deployment troubleshooting: Vercel and Supabase both have excellent free-tier support docs.
