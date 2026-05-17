/* =========================================================
   SCL — Supabase Client Wrapper
   ---------------------------------------------------------
   Handles blog content + form submissions.
   Falls back gracefully when not configured (for local dev).
   ========================================================= */

const SCL_CONFIG = {
  // Replace with your Supabase project URL + anon key.
  // Found in Supabase dashboard → Project Settings → API.
  // It's safe to expose the anon key — RLS policies enforce security.
  SUPABASE_URL:      'https://xnfcqinkmucedmrlrylj.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZmNxaW5rbXVjZWRtcmxyeWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMzgwNTAsImV4cCI6MjA5NDYxNDA1MH0.A-kksNRHF1iuc2_8-jtIgNhL-UAie2GhAjcsED5KF9A',
};

const SCLBackend = (function() {
  let client = null;
  let ready = false;

  function init() {
    if (typeof window.supabase === 'undefined') {
      console.info('[SCL] Supabase SDK not loaded — backend running in offline mode.');
      return;
    }
    if (!SCL_CONFIG.SUPABASE_URL || SCL_CONFIG.SUPABASE_URL.includes('YOUR_PROJECT')) {
      console.info('[SCL] Supabase not configured — running in offline mode.');
      return;
    }
    try {
      client = window.supabase.createClient(SCL_CONFIG.SUPABASE_URL, SCL_CONFIG.SUPABASE_ANON_KEY);
      ready = true;
      console.info('[SCL] Supabase backend ready.');
    } catch (e) {
      console.warn('[SCL] Supabase init failed:', e);
    }
  }

  // ─── Form Submissions ─────────────────────────────────
  async function submitApplication(payload) {
    if (!ready) {
      // Offline fallback: log + simulate success
      console.info('[SCL] Submission (offline):', payload);
      return { ok: true, offline: true, ref: payload.ref_number };
    }
    const { data, error } = await client
      .from('applications')
      .insert([payload])
      .select()
      .single();
    if (error) {
      console.error('[SCL] Submission failed:', error);
      return { ok: false, error: error.message };
    }
    return { ok: true, data };
  }

  async function submitConsultation(payload) {
    if (!ready) {
      console.info('[SCL] Consultation (offline):', payload);
      return { ok: true, offline: true };
    }
    const { data, error } = await client
      .from('consultations')
      .insert([payload])
      .select()
      .single();
    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }

  async function subscribeNewsletter(email) {
    if (!ready) {
      console.info('[SCL] Newsletter (offline):', email);
      return { ok: true, offline: true };
    }
    const { error } = await client
      .from('newsletter_subscribers')
      .insert([{ email, source: 'website' }]);
    if (error && !error.message.includes('duplicate')) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  }

  // ─── Blog ────────────────────────────────────────────
  async function getBlogPosts({ limit = 12, offset = 0, category = null } = {}) {
    if (!ready) {
      // Return demo posts when offline
      return { ok: true, data: getDemoBlogPosts(), offline: true };
    }
    let q = client
      .from('blog_posts')
      .select('id, slug, title, excerpt, category, cover_image, published_at, author, read_time')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (category) q = q.eq('category', category);
    const { data, error } = await q;
    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }

  async function getBlogPost(slug) {
    if (!ready) {
      const post = getDemoBlogPosts().find(p => p.slug === slug);
      return { ok: !!post, data: post, offline: true };
    }
    const { data, error } = await client
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }

  // ─── Demo data fallback (offline) ────────────────────
  function getDemoBlogPosts() {
    return [
      {
        id: 'demo-1',
        slug: 'sba-7a-vs-conventional-term-loans',
        title: 'SBA 7(a) vs Conventional Term Loans: Choosing Structure',
        excerpt: 'A comparative read on capital structure for businesses weighing SBA programs against conventional term debt — guarantees, pricing, and prepayment realities.',
        category: 'Capital Structure',
        cover_image: '',
        published_at: '2026-04-22T10:00:00Z',
        author: 'Senior Advisory Desk',
        read_time: 7,
        content: ''
      },
      {
        id: 'demo-2',
        slug: 'dscr-the-new-investor-standard',
        title: 'DSCR: The New Standard for Investor Lending',
        excerpt: 'Debt-service coverage ratio loans have quietly displaced full-doc programs for many investors. Here\'s where the structure fits — and where it doesn\'t.',
        category: 'Real Estate',
        cover_image: '',
        published_at: '2026-04-08T10:00:00Z',
        author: 'Senior Advisory Desk',
        read_time: 6,
        content: ''
      },
      {
        id: 'demo-3',
        slug: 'understanding-bridge-loan-exit-strategy',
        title: 'The Anatomy of a Sound Bridge Loan Exit Strategy',
        excerpt: 'Bridge financing is only as safe as its exit. We break down the three primary exit paths and how underwriters evaluate each.',
        category: 'Bridge & Short-Term',
        cover_image: '',
        published_at: '2026-03-19T10:00:00Z',
        author: 'Senior Advisory Desk',
        read_time: 8,
        content: ''
      },
      {
        id: 'demo-4',
        slug: 'equipment-financing-section-179',
        title: 'Equipment Financing and Section 179: Year-End Planning',
        excerpt: 'For capital-intensive operators, equipment timing is tax timing. A practical look at Section 179 expensing in combination with leveraged acquisition.',
        category: 'Tax & Structure',
        cover_image: '',
        published_at: '2026-03-04T10:00:00Z',
        author: 'Senior Advisory Desk',
        read_time: 5,
        content: ''
      },
      {
        id: 'demo-5',
        slug: 'cre-cap-rate-compression-2026',
        title: 'CRE Cap Rate Compression: Reading the 2026 Cycle',
        excerpt: 'Commercial real estate operators are navigating a market where cap rate compression has uneven texture. How to think about acquisition timing.',
        category: 'Real Estate',
        cover_image: '',
        published_at: '2026-02-14T10:00:00Z',
        author: 'Senior Advisory Desk',
        read_time: 9,
        content: ''
      },
      {
        id: 'demo-6',
        slug: 'factoring-vs-line-of-credit',
        title: 'Factoring vs. Line of Credit: A Cash Flow Decision Framework',
        excerpt: 'When invoice factoring genuinely outperforms a revolving credit facility — and when the math says you should hold out for the LOC.',
        category: 'Working Capital',
        cover_image: '',
        published_at: '2026-01-28T10:00:00Z',
        author: 'Senior Advisory Desk',
        read_time: 6,
        content: ''
      }
    ];
  }

  // Init on DOM ready
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  return {
    submitApplication,
    submitConsultation,
    subscribeNewsletter,
    getBlogPosts,
    getBlogPost,
    isReady: () => ready,
  };
})();

window.SCLBackend = SCLBackend;
