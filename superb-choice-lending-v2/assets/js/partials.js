/* =========================================================
   SCL — Shared Header & Footer
   Injects the nav and footer into every page so they
   live in one place. Just include this script and add:
     <div data-scl-header></div>
     <div data-scl-footer></div>
   ========================================================= */

const SCL_NAV_LINKS = [
  { href: '/index.html', label: 'Home' },
  {
    label: 'Loan Programs', dropdown: [
      { href: '/working-capital.html',   title: 'Working Capital',         sub: 'Short-Term Liquidity' },
      { href: '/term-loan.html',         title: 'Business Term Loan',      sub: 'Structured Debt' },
      { href: '/line-of-credit.html',    title: 'Line of Credit',          sub: 'Revolving Facility' },
      { href: '/mca.html',               title: 'Merchant Cash Advance',   sub: 'Revenue-Based' },
      { href: '/equipment-financing.html', title: 'Equipment Financing',   sub: 'Asset-Backed' },
      { href: '/factoring.html',         title: 'Invoice Factoring',       sub: 'Receivables Sale' },
      { href: '/ar-financing.html',      title: 'A/R Financing',           sub: 'Receivables Loan' },
      { href: '/commercial-real-estate.html', title: 'Commercial Real Estate', sub: 'CRE Financing' },
    ]
  },
  { href: '/apply.html',   label: 'Apply' },
  { href: '/blog.html',    label: 'Insights' },
  { href: '/about.html',   label: 'About' },
  { href: '/contact.html', label: 'Contact' },
];

function renderHeader() {
  const navItems = SCL_NAV_LINKS.map(item => {
    if (item.dropdown) {
      return `
        <div class="dropdown">
          <a href="javascript:void(0)" class="has-dropdown">${item.label}</a>
          <div class="dropdown-menu">
            ${item.dropdown.map(d => `
              <a href="${d.href}">
                ${d.title}
                <small>${d.sub}</small>
              </a>
            `).join('')}
          </div>
        </div>`;
    }
    return `<a href="${item.href}">${item.label}</a>`;
  }).join('');

  return `
    <header class="site-header">
      <div class="container inner">
        <a href="/index.html" class="brand-mark" aria-label="Superb Choice Lending Home">
          <img src="/assets/img/logo-horizontal.png" alt="Superb Choice Lending" loading="eager"/>
        </a>

        <nav class="site-nav" aria-label="Primary">
          ${navItems}
        </nav>

        <div style="display:flex; align-items:center; gap:12px;">
          <a href="/contact.html" class="btn btn-primary header-cta" style="display:inline-flex;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Speak With An Advisor
          </a>
          <button class="mobile-nav-toggle" aria-label="Open menu" aria-expanded="false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile drawer -->
    <div class="mobile-nav-backdrop" aria-hidden="true"></div>
    <aside class="mobile-nav" aria-label="Mobile navigation">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <img src="/assets/img/logo-horizontal.png" alt="" style="height:36px;"/>
        <button class="mobile-nav-close" aria-label="Close menu" style="background:transparent; border:1px solid var(--hairline); padding:6px 8px; border-radius:4px; cursor:pointer;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <a href="/index.html">Home</a>
      <div class="section-label">Loan Programs</div>
      ${SCL_NAV_LINKS.find(i => i.dropdown).dropdown.map(d =>
        `<a href="${d.href}">${d.title}</a>`
      ).join('')}
      <div class="section-label">Firm</div>
      <a href="/apply.html">Apply</a>
      <a href="/blog.html">Insights</a>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
      <a href="/contact.html" class="btn btn-primary" style="display:flex; margin-top:20px; justify-content:center;">Speak With An Advisor</a>
    </aside>

    <!-- Mobile sticky CTA -->
    <div class="mobile-cta-bar">
      <a href="/contact.html" class="btn btn-outline">Advisor</a>
      <a href="/apply.html" class="btn btn-primary">Apply Now</a>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
              <img src="/assets/img/logo-horizontal.png" alt="Superb Choice Lending" style="height:54px; filter:brightness(1.15);"/>
            </div>
            <p style="font-size:13px; line-height:1.7; color:rgba(244,239,227,0.55); max-width:420px; margin:0 0 16px;">
              A boutique commercial finance brokerage placing structured capital for businesses, investors, and real estate operators across all 50 states.
            </p>
            <p style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(212,168,92,0.8); font-style:italic; font-family:var(--font-display); margin:0;">
              Integritas · Diligentia · Fiducia
            </p>
          </div>
          <div>
            <h5>Programs</h5>
            <ul>
              <li><a href="/working-capital.html">Working Capital</a></li>
              <li><a href="/term-loan.html">Term Loans</a></li>
              <li><a href="/line-of-credit.html">Line of Credit</a></li>
              <li><a href="/equipment-financing.html">Equipment Financing</a></li>
              <li><a href="/commercial-real-estate.html">Commercial Real Estate</a></li>
              <li><a href="/mca.html">Merchant Cash Advance</a></li>
              <li><a href="/factoring.html">Factoring</a></li>
              <li><a href="/ar-financing.html">A/R Financing</a></li>
            </ul>
          </div>
          <div>
            <h5>Firm</h5>
            <ul>
              <li><a href="/about.html">About Us</a></li>
              <li><a href="/blog.html">Insights</a></li>
              <li><a href="/apply.html">Apply</a></li>
              <li><a href="/contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:+15619998888">(561) 999-8888</a></li>
              <li><a href="mailto:advisors@superbchoicelending.com">advisors@superbchoicelending.com</a></li>
              <li style="margin-top:14px; color:rgba(244,239,227,0.5); font-size:12px;">
                Boca Raton, Florida<br/>
                Monday–Friday · 9am–6pm ET
              </li>
            </ul>
          </div>
        </div>
        <div style="height:1px; background:linear-gradient(90deg, transparent, rgba(184,137,62,0.3), transparent); margin-bottom:24px;"></div>
        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} Superb Choice Lending. All rights reserved. Equal Opportunity Lender.</div>
          <div style="display:flex; gap:20px;">
            <a href="/privacy.html">Privacy</a>
            <a href="/terms.html">Terms</a>
            <a href="/disclosures.html">Disclosures</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Inject
(function injectPartials() {
  const headerSlot = document.querySelector('[data-scl-header]');
  if (headerSlot) headerSlot.outerHTML = renderHeader();

  const footerSlot = document.querySelector('[data-scl-footer]');
  if (footerSlot) footerSlot.outerHTML = renderFooter();

  // Wire mobile close button after inject
  document.addEventListener('click', e => {
    if (e.target.closest('.mobile-nav-close')) {
      document.querySelector('.mobile-nav')?.classList.remove('open');
      document.querySelector('.mobile-nav-backdrop')?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();
