-- ==========================================================
-- SUPERB CHOICE LENDING — Supabase Schema
-- Run this in your Supabase SQL Editor on first setup.
-- ==========================================================

-- Enable UUID extension (usually on by default in Supabase)
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────
-- 1. LOAN APPLICATIONS
-- ─────────────────────────────────────────────────────────
create table if not exists applications (
  id              uuid primary key default uuid_generate_v4(),
  ref_number      text unique not null,
  product_slug    text not null,
  product_name    text not null,
  form_data       jsonb not null default '{}'::jsonb,
  status          text not null default 'new',  -- new | reviewing | approved | declined | funded
  notes           text,
  submitted_at    timestamptz not null default now(),
  reviewed_at     timestamptz,
  reviewed_by     uuid references auth.users(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_applications_status on applications(status);
create index if not exists idx_applications_product on applications(product_slug);
create index if not exists idx_applications_submitted on applications(submitted_at desc);

-- ─────────────────────────────────────────────────────────
-- 2. CONSULTATION REQUESTS (Contact form)
-- ─────────────────────────────────────────────────────────
create table if not exists consultations (
  id              uuid primary key default uuid_generate_v4(),
  first_name      text not null,
  last_name       text not null,
  email           text not null,
  phone           text not null,
  business_name   text not null,
  interest        text,
  message         text,
  status          text not null default 'new', -- new | contacted | scheduled | closed
  submitted_at    timestamptz not null default now(),
  contacted_at    timestamptz,
  notes           text,
  created_at      timestamptz not null default now()
);

create index if not exists idx_consultations_status on consultations(status);
create index if not exists idx_consultations_submitted on consultations(submitted_at desc);

-- ─────────────────────────────────────────────────────────
-- 3. NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id              uuid primary key default uuid_generate_v4(),
  email           text unique not null,
  source          text default 'website',
  status          text not null default 'subscribed', -- subscribed | unsubscribed
  subscribed_at   timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create index if not exists idx_newsletter_status on newsletter_subscribers(status);

-- ─────────────────────────────────────────────────────────
-- 4. BLOG POSTS
-- ─────────────────────────────────────────────────────────
create table if not exists blog_posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,
  excerpt         text,
  content         text,        -- HTML or Markdown body
  category        text,
  cover_image     text,        -- URL to image in Supabase Storage
  author          text default 'Senior Advisory Desk',
  read_time       int default 5,
  status          text not null default 'draft', -- draft | published | archived
  seo_title       text,
  seo_description text,
  tags            text[],
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_blog_status on blog_posts(status, published_at desc);
create index if not exists idx_blog_slug on blog_posts(slug);
create index if not exists idx_blog_category on blog_posts(category);

-- ─────────────────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────
-- Enable RLS on all tables
alter table applications enable row level security;
alter table consultations enable row level security;
alter table newsletter_subscribers enable row level security;
alter table blog_posts enable row level security;

-- ── PUBLIC POLICIES ────────────────────────────────────
-- Anyone can submit applications (INSERT only)
create policy "Public can submit applications"
  on applications for insert
  to anon, authenticated
  with check (true);

-- Anyone can submit consultations
create policy "Public can submit consultations"
  on consultations for insert
  to anon, authenticated
  with check (true);

-- Anyone can subscribe to newsletter
create policy "Public can subscribe to newsletter"
  on newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

-- Anyone can READ published blog posts
create policy "Public can read published posts"
  on blog_posts for select
  to anon, authenticated
  using (status = 'published');

-- ── ADMIN POLICIES ─────────────────────────────────────
-- Authenticated users (admins) can do everything
create policy "Admins can manage applications"
  on applications for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins can manage consultations"
  on consultations for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins can manage newsletter"
  on newsletter_subscribers for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins can manage blog posts"
  on blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────────────────
-- 6. AUTO-UPDATE TIMESTAMPS
-- ─────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger applications_updated_at
  before update on applications
  for each row execute function set_updated_at();

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────
-- 7. STORAGE BUCKETS (run in Storage section of dashboard)
-- ─────────────────────────────────────────────────────────
-- Manually create these buckets in the Supabase Storage UI:
--
--   blog-images   (public read, authenticated write)
--   uploads       (private, authenticated only — for loan docs)
--
-- Then set RLS policies on storage.objects:
--
--   - blog-images: SELECT for everyone, INSERT/UPDATE/DELETE for authenticated
--   - uploads: SELECT/INSERT/UPDATE/DELETE for authenticated only

-- ─────────────────────────────────────────────────────────
-- 8. SAMPLE BLOG POST (optional, for testing)
-- ─────────────────────────────────────────────────────────
insert into blog_posts (slug, title, excerpt, content, category, status, published_at, read_time)
values (
  'welcome-to-superb-choice-lending-insights',
  'Welcome to Superb Choice Lending Insights',
  'An introduction to our advisory desk and the perspectives we''ll be sharing on capital structure, market commentary, and operator-facing analysis.',
  '<p>Welcome to our advisory desk. This is the first of what we expect to be an ongoing series of perspectives on capital structure, market commentary, and operator-facing analysis.</p>
   <p>We write for the few who read carefully. Each piece will be short on hype and long on substance.</p>
   <h2>What You Can Expect</h2>
   <p>Insights covering working capital structuring, term debt comparison, CRE financing approaches, equipment leasing nuance, and the operational realities of working with each capital structure.</p>',
  'Firm Announcements',
  'published',
  now(),
  3
)
on conflict (slug) do nothing;
