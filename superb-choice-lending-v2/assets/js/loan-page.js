/* =========================================================
   SCL — Loan Page Renderer
   Reads window.SCL_PRODUCT_SLUG and renders entire page.
   ========================================================= */

(function() {

  function init() {
    const slug = window.SCL_PRODUCT_SLUG;
    if (!slug || !window.SCL_LOANS || !window.SCL_LOANS[slug]) {
      console.error('SCL: Invalid product slug or catalog not loaded');
      return;
    }
    const loan = window.SCL_LOANS[slug];

    // 1. Inject SEO meta
    injectSeoMeta(loan);

    // 2. Render page content
    renderPage(loan);

    // 3. Wire up form
    wireForm(loan);
  }

  // ─── SEO META ────────────────────────────────────────────
  function injectSeoMeta(loan) {
    document.title = loan.seo.title;

    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        const [name, value] = sel.match(/\[(\w+)="([^"]+)"\]/).slice(1);
        el.setAttribute(name, value);
        document.head.appendChild(el);
      }
      el.setAttribute(attr || 'content', val);
    };

    setMeta('meta[name="description"]', 'content', loan.seo.description);
    setMeta('meta[name="keywords"]', 'content', loan.seo.keywords);
    setMeta('meta[property="og:title"]', 'content', loan.seo.title);
    setMeta('meta[property="og:description"]', 'content', loan.seo.description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', `https://superbchoicelending.com/${loan.slug}.html`);
    setMeta('meta[property="og:image"]', 'content', 'https://superbchoicelending.com/assets/img/logo-horizontal.png');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', loan.seo.title);
    setMeta('meta[name="twitter:description"]', 'content', loan.seo.description);

    // Canonical
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', `https://superbchoicelending.com/${loan.slug}.html`);

    // JSON-LD schemas
    if (window.SCLSeo) {
      const schemas = [
        window.SCLSeo.getLoanSchema({
          name: loan.name,
          description: loan.seo.description,
          url: `https://superbchoicelending.com/${loan.slug}.html`,
          term: loan.term,
          amount: loan.amount,
        }),
        window.SCLSeo.getFAQSchema(loan.faqs),
        window.SCLSeo.getBreadcrumbSchema([
          { name: 'Home', url: 'https://superbchoicelending.com/' },
          { name: 'Loan Programs', url: 'https://superbchoicelending.com/#programs' },
          { name: loan.name, url: `https://superbchoicelending.com/${loan.slug}.html` },
        ]),
      ];
      window.SCLSeo.injectSchema(schemas);
    }
  }

  // ─── PAGE CONTENT ────────────────────────────────────────
  function renderPage(loan) {
    const main = document.getElementById('scl-main');
    if (!main) return;

    main.innerHTML = `
      <!-- Breadcrumb -->
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="/index.html">Home</a>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          <a href="/index.html#programs">Loan Programs</a>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          <span>${loan.name}</span>
        </nav>
      </div>

      <!-- HERO -->
      <section class="page-hero">
        <div class="ornament-blob" style="width:480px;height:480px;top:-160px;right:-140px;background:radial-gradient(circle,rgba(184,137,62,0.18) 0%,transparent 70%);"></div>
        <div class="ornament-blob" style="width:380px;height:380px;bottom:-180px;left:-120px;background:radial-gradient(circle,rgba(31,77,58,0.10) 0%,transparent 70%);"></div>

        <div class="container">
          <div class="page-hero-inner">
            <div>
              <div class="fade-in stagger-1 eyebrow" style="margin-bottom:18px;">${loan.category}</div>

              <h1 class="fade-in stagger-2 h1">
                ${loan.headline} <em class="italic-accent">${loan.headlineAccent}</em><br/>
                ${loan.headlineEnd}
              </h1>

              <div class="fade-in stagger-3 gold-divider-short" style="margin: 22px 0 22px;"></div>

              <p class="fade-in stagger-3 lede">${loan.lede}</p>

              <div class="fade-in stagger-4" style="display:flex; flex-wrap:wrap; gap:12px; margin-top:32px;">
                <a href="#apply" class="btn btn-primary btn-lg">
                  Apply For ${loan.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="/contact.html" class="btn btn-outline btn-lg">Speak With An Advisor</a>
              </div>

              <div class="fade-in stagger-5 inline-stats" style="margin-top:48px;">
                ${loan.highlights.slice(0, 3).map(h => `
                  <div>
                    <div class="inline-stat-num">${h.value}</div>
                    <div class="inline-stat-label">${h.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Decorative card -->
            <div class="fade-in stagger-4" style="position:relative;">
              <div style="position:relative; background: linear-gradient(135deg, var(--navy), var(--navy-deep) 50%, var(--forest-deep)); border-radius: var(--radius-lg); padding: 40px 36px; overflow: hidden; min-height: 460px; color: var(--ivory);">
                <div style="position:absolute; inset:0; opacity:0.18;" class="pattern-grid"></div>

                <div style="position:relative;">
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:32px;">
                    <div style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:var(--gold-light); font-weight:600;">Program Snapshot</div>
                    <div style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(244,239,227,0.4); font-weight:500;">MMXXVI</div>
                  </div>

                  <div style="margin-bottom:36px;">
                    <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 500; line-height: 1.1; margin-bottom: 6px;">${loan.name}</div>
                    <div style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold-light); font-weight:500;">${loan.category}</div>
                  </div>

                  <div style="display:grid; gap:14px;">
                    ${loan.highlights.map(h => `
                      <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom: 1px solid rgba(212,168,92,0.18); font-size:13px;">
                        <span style="color:rgba(244,239,227,0.6); text-transform:uppercase; font-size:10px; letter-spacing:0.15em; font-weight:600;">${h.label}</span>
                        <span style="color:var(--ivory); font-weight:500;">${h.value}</span>
                      </div>
                    `).join('')}
                  </div>

                  <div style="margin-top:30px; padding-top:24px; border-top: 1px solid rgba(212,168,92,0.25); font-family:var(--font-display); font-style:italic; color:rgba(244,239,227,0.85); font-size: 1.05rem; line-height:1.4;">
                    Integritas · Diligentia · Fiducia
                  </div>
                </div>
              </div>

              <!-- Floating accent card -->
              <div style="position:absolute; bottom:-20px; right:-16px; background: var(--ivory-warm); border: 1px solid rgba(184,137,62,0.35); border-radius: var(--radius); padding: 16px 20px; box-shadow: 0 12px 28px -8px rgba(14,42,71,0.18); display:none;" class="float-card-1">
                <div style="font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); font-weight:600;">Speed</div>
                <div style="font-family: var(--font-display); font-size: 1.2rem; color: var(--navy); font-weight:500; margin-top:2px;">${loan.speed}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- OVERVIEW -->
      <section style="padding: 60px 0 30px;">
        <div class="container">
          <div style="display:grid; grid-template-columns: 1fr; gap: 40px; max-width: 1100px; margin: 0 auto;" class="overview-grid">
            <div class="reveal">
              <div class="eyebrow" style="margin-bottom:14px;">Overview</div>
              <h2 class="h2" style="margin: 0 0 24px;">What Is <em class="italic-accent">${loan.name}</em>?</h2>
              <div class="gold-divider-short" style="margin-bottom:24px;"></div>
              <p style="font-size:15px; line-height:1.8; color: var(--muted-strong); margin: 0;">${loan.overview}</p>
            </div>
            <div class="reveal">
              <div class="eyebrow" style="margin-bottom:14px;">Best Suited For</div>
              <h3 class="h3" style="margin: 0 0 24px;">Who This Program <em class="italic-accent">Serves</em></h3>
              <div class="gold-divider-short" style="margin-bottom:24px;"></div>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${loan.whoFor.map(item => `
                  <li style="display:flex; gap:14px; padding: 12px 0; border-bottom: 1px solid var(--hairline-soft); font-size: 14px; color: var(--navy); line-height: 1.5;">
                    <span style="color: var(--gold); flex-shrink:0; margin-top:6px;">◆</span>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style>
        @media (min-width: 1024px) {
          .overview-grid { grid-template-columns: 1.3fr 1fr !important; gap: 80px !important; }
          .float-card-1 { display: block !important; }
        }
      </style>

      <!-- APPLICATION FORM -->
      <section id="apply" style="padding: 60px 0;">
        <div class="container" style="max-width: 980px;">
          <div class="reveal" style="text-align:center; max-width: 640px; margin: 0 auto 40px;">
            <div class="eyebrow" style="margin-bottom:14px;">Capital Application</div>
            <h2 class="h2">Apply For <em class="italic-accent">${loan.name}</em></h2>
            <div class="gold-divider-short" style="margin: 22px auto;"></div>
            <p style="font-size:15px; color: var(--muted-strong); margin:0; font-weight:300;">
              Confidential review by a senior advisor. Soft credit pull only — no impact to your credit score until you proceed.
            </p>
          </div>

          <form id="loan-form" class="card card-padded reveal" novalidate>
            <input type="hidden" id="product_slug" value="${loan.slug}" />

            <!-- Progress -->
            <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 12px;">
              <div>
                <div class="eyebrow" style="margin-bottom: 6px;">Step <span id="step-current">1</span> of 4</div>
                <div class="h3" style="margin:0;" id="step-title">Business Information</div>
              </div>
              <div style="text-align: right;">
                <div class="eyebrow" style="margin-bottom: 4px;">Progress</div>
                <div style="font-family: var(--font-display); font-size: 1.5rem; color: var(--navy); font-weight:500;" id="progress-pct">0%</div>
              </div>
            </div>

            <div style="height: 3px; background: rgba(14,42,71,0.08); border-radius: 2px; overflow: hidden; margin-bottom: 36px;">
              <div id="progress-bar" style="height:100%; background: linear-gradient(90deg, var(--forest), var(--gold)); border-radius: 2px; width: 0%; transition: width 0.5s ease;"></div>
            </div>

            <!-- STEP 1 — Business Information -->
            <div class="form-step" data-step="1">
              ${renderStep1Fields()}
            </div>

            <!-- STEP 2 — Owner Information -->
            <div class="form-step" data-step="2" style="display:none;">
              ${renderStep2Fields()}
            </div>

            <!-- STEP 3 — Financial Snapshot + Program-Specific -->
            <div class="form-step" data-step="3" style="display:none;">
              ${renderStep3Fields(loan)}
            </div>

            <!-- STEP 4 — Loan Request + Authorization -->
            <div class="form-step" data-step="4" style="display:none;">
              ${renderStep4Fields(loan)}
            </div>

            <!-- Wizard nav -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--hairline); display:flex; flex-direction: column-reverse; sm:flex-direction:row; justify-content: space-between; gap: 12px;" class="wizard-nav">
              <button type="button" id="prev-btn" class="btn btn-outline" disabled>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back
              </button>
              <button type="button" id="next-btn" class="btn btn-primary">
                <span class="btn-label">Continue</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </form>

          <style>
            @media (min-width: 640px) {
              .wizard-nav { flex-direction: row !important; }
            }
          </style>

          <!-- Help text below form -->
          <p style="text-align:center; font-size:12px; color: var(--muted); margin-top: 24px;">
            Need assistance? Call <a href="tel:+15619998888" style="color:var(--gold); font-weight:500; text-decoration:none;">(561) 999-8888</a> · Senior advisor available Monday–Friday, 9am–6pm ET.
          </p>
        </div>
      </section>

      <!-- FAQ — drives AEO -->
      <section style="padding: 60px 0; background: var(--ivory);">
        <div class="container" style="max-width: 880px;">
          <div class="reveal" style="text-align: center; margin-bottom: 50px;">
            <div class="eyebrow" style="margin-bottom: 14px;">Frequently Asked</div>
            <h2 class="h2">Answers, <em class="italic-accent">Up Front.</em></h2>
            <div class="gold-divider-short" style="margin: 22px auto 0;"></div>
          </div>

          <div class="reveal">
            ${loan.faqs.map(faq => `
              <details class="faq-item">
                <summary class="faq-question">
                  ${faq.q}
                  <span class="faq-chevron">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </summary>
                <div class="faq-answer">${faq.a}</div>
              </details>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Related products -->
      <section style="padding: 60px 0 80px;">
        <div class="container">
          <div class="reveal" style="text-align: center; margin-bottom: 40px;">
            <div class="eyebrow" style="margin-bottom: 14px;">Other Programs</div>
            <h2 class="h2">Explore Adjacent <em class="italic-accent">Structures</em></h2>
            <div class="gold-divider-short" style="margin: 22px auto 0;"></div>
          </div>

          <div class="reveal" style="display: grid; grid-template-columns: 1fr; gap: 20px;" class="related-grid">
            ${getRelated(loan).map(rel => `
              <a href="/${rel.slug}.html" class="loan-card">
                <div class="loan-card-icon">${rel.icon}</div>
                <div class="loan-card-sub">${rel.category}</div>
                <h3 class="loan-card-title">${rel.name}</h3>
                <p class="loan-card-desc">${rel.lede.substring(0, 130)}…</p>
                <div class="loan-card-meta">
                  <span>${rel.highlights[0].value}</span>
                  <span class="loan-card-arrow">→</span>
                </div>
              </a>
            `).join('')}
          </div>

          <style>
            @media (min-width: 768px) {
              .related-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
          </style>
        </div>
      </section>
    `;
  }

  function getRelated(currentLoan) {
    const all = Object.values(window.SCL_LOANS);
    return all.filter(l => l.slug !== currentLoan.slug).slice(0, 3);
  }

  // ─── FORM STEP TEMPLATES ───────────────────────────────
  function renderStep1Fields() {
    return `
      <div style="display:grid; grid-template-columns: 1fr; gap: 18px;" class="grid-2col">
        <div class="field"><input type="text" id="business_name" placeholder=" " required data-rules="required" /><label for="business_name">Legal Business Name</label><div class="field-error"></div></div>
        <div class="field"><input type="text" id="dba_name" placeholder=" " /><label for="dba_name">DBA Name (if different)</label></div>
        <div class="field"><input type="text" id="ein" placeholder=" " required data-rules="required|ein" data-format="ein" maxlength="10" /><label for="ein">EIN</label><div class="field-error"></div></div>
        <div class="field">
          <select id="entity_type" required data-rules="required">
            <option value="" disabled selected hidden></option>
            <option>LLC</option><option>S-Corporation</option><option>C-Corporation</option><option>Partnership</option><option>Sole Proprietorship</option><option>Non-Profit</option>
          </select>
          <label for="entity_type">Entity Type</label>
          <div class="field-error"></div>
        </div>
        <div class="field">
          <select id="state_incorp" required data-rules="required|state" data-states>
            <option value="" disabled selected hidden></option>
          </select>
          <label for="state_incorp">State of Incorporation</label>
          <div class="field-error"></div>
        </div>
        <div class="field"><input type="date" id="date_established" placeholder=" " required data-rules="required|pastDate" /><label for="date_established">Date Established</label><div class="field-error"></div></div>
        <div class="field">
          <select id="industry" required data-rules="required">
            <option value="" disabled selected hidden></option>
            <option>Construction</option><option>Healthcare</option><option>Real Estate</option><option>Hospitality</option><option>Retail</option><option>Manufacturing</option><option>Professional Services</option><option>Logistics & Transportation</option><option>Technology</option><option>Food & Beverage</option><option>Other</option>
          </select>
          <label for="industry">Industry</label>
          <div class="field-error"></div>
        </div>
        <div class="field"><input type="text" id="naics_code" placeholder=" " data-rules="naics" /><label for="naics_code">NAICS Code (optional)</label><div class="field-error"></div></div>

        <div class="field" style="grid-column: 1 / -1;"><input type="text" id="business_address" placeholder=" " required data-rules="required" /><label for="business_address">Business Street Address</label><div class="field-error"></div></div>
        <div class="field"><input type="text" id="business_city" placeholder=" " required data-rules="required" /><label for="business_city">City</label><div class="field-error"></div></div>
        <div class="field">
          <select id="business_state" required data-rules="required|state" data-states>
            <option value="" disabled selected hidden></option>
          </select>
          <label for="business_state">State</label>
          <div class="field-error"></div>
        </div>
        <div class="field"><input type="text" id="business_zip" placeholder=" " required data-rules="required|zip" data-format="zip" maxlength="10" /><label for="business_zip">ZIP Code</label><div class="field-error"></div></div>

        <div class="field"><input type="tel" id="business_phone" placeholder=" " required data-rules="required|phone" data-format="phone" /><label for="business_phone">Business Phone</label><div class="field-error"></div></div>
        <div class="field"><input type="email" id="business_email" placeholder=" " required data-rules="required|email" /><label for="business_email">Business Email</label><div class="field-error"></div></div>
        <div class="field" style="grid-column: 1 / -1;"><input type="url" id="website" placeholder=" " data-rules="url" /><label for="website">Website (optional)</label><div class="field-error"></div></div>
      </div>
    `;
  }

  function renderStep2Fields() {
    return `
      <div style="display:grid; grid-template-columns: 1fr; gap: 18px;" class="grid-2col">
        <div class="field"><input type="text" id="owner_first" placeholder=" " required data-rules="required" /><label for="owner_first">First Name</label><div class="field-error"></div></div>
        <div class="field"><input type="text" id="owner_last" placeholder=" " required data-rules="required" /><label for="owner_last">Last Name</label><div class="field-error"></div></div>
        <div class="field"><input type="date" id="owner_dob" placeholder=" " required data-rules="required|age18" /><label for="owner_dob">Date of Birth</label><div class="field-error"></div></div>
        <div class="field"><input type="text" id="owner_ssn" placeholder=" " required data-rules="required|ssn" data-format="ssn" maxlength="11" autocomplete="off" /><label for="owner_ssn">Social Security Number</label><div class="field-error"></div></div>
        <div class="field"><input type="number" id="ownership_pct" placeholder=" " required data-rules="required|range:0:100" min="0" max="100" /><label for="ownership_pct">Ownership Percentage</label><div class="field-error"></div></div>
        <div class="field"><input type="tel" id="owner_phone" placeholder=" " required data-rules="required|phone" data-format="phone" /><label for="owner_phone">Mobile Phone</label><div class="field-error"></div></div>
        <div class="field" style="grid-column: 1 / -1;"><input type="email" id="owner_email" placeholder=" " required data-rules="required|email" /><label for="owner_email">Personal Email</label><div class="field-error"></div></div>
        <div class="field" style="grid-column: 1 / -1;"><input type="text" id="home_address" placeholder=" " required data-rules="required" /><label for="home_address">Home Street Address</label><div class="field-error"></div></div>
        <div class="field"><input type="text" id="home_city" placeholder=" " required data-rules="required" /><label for="home_city">City</label><div class="field-error"></div></div>
        <div class="field">
          <select id="home_state" required data-rules="required|state" data-states>
            <option value="" disabled selected hidden></option>
          </select>
          <label for="home_state">State</label>
          <div class="field-error"></div>
        </div>
        <div class="field"><input type="text" id="home_zip" placeholder=" " required data-rules="required|zip" data-format="zip" maxlength="10" /><label for="home_zip">ZIP Code</label><div class="field-error"></div></div>
        <div class="field">
          <select id="credit_score" required data-rules="required">
            <option value="" disabled selected hidden></option>
            <option>800+ (Exceptional)</option><option>740–799 (Excellent)</option><option>670–739 (Good)</option><option>620–669 (Fair)</option><option>580–619 (Below Average)</option><option>Below 580</option>
          </select>
          <label for="credit_score">Estimated Personal Credit Score</label>
          <div class="field-error"></div>
        </div>
      </div>

      <div style="margin-top: 28px; padding: 16px 20px; background: rgba(31,77,58,0.04); border: 1px solid rgba(31,77,58,0.15); border-radius: var(--radius); display: flex; gap: 12px; align-items: flex-start;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" stroke-width="1.8" style="flex-shrink:0; margin-top:2px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        <div style="font-size: 12px; color: var(--muted-strong); line-height: 1.6;">
          Your SSN is encrypted at submission and used only for identity verification and the soft credit pull. We never store SSN in unsecured form.
        </div>
      </div>
    `;
  }

  function renderStep3Fields(loan) {
    return `
      <!-- Financial Snapshot -->
      <div>
        <h4 class="h4" style="margin: 0 0 18px; display:flex; align-items:center; gap:10px;">
          <span style="color: var(--gold); font-size: 12px;">◆</span>
          Financial Snapshot
        </h4>
        <div style="display:grid; grid-template-columns: 1fr; gap: 18px;" class="grid-2col">
          <div class="field"><input type="text" id="annual_revenue" placeholder=" " required data-rules="required|currency" data-format="currency" /><label for="annual_revenue">Annual Revenue</label><div class="field-error"></div></div>
          <div class="field"><input type="text" id="avg_monthly_revenue" placeholder=" " required data-rules="required|currency" data-format="currency" /><label for="avg_monthly_revenue">Average Monthly Revenue</label><div class="field-error"></div></div>
          <div class="field"><input type="text" id="avg_monthly_deposits" placeholder=" " required data-rules="required|currency" data-format="currency" /><label for="avg_monthly_deposits">Average Monthly Deposits</label><div class="field-error"></div></div>
          <div class="field"><input type="number" id="num_monthly_deposits" placeholder=" " required data-rules="required|range:0:500" /><label for="num_monthly_deposits">Number of Monthly Deposits</label><div class="field-error"></div></div>
          <div class="field">
            <select id="existing_debt" required data-rules="required">
              <option value="" disabled selected hidden></option>
              <option>None</option><option>Yes — under $100K</option><option>Yes — $100K–$500K</option><option>Yes — $500K–$1M</option><option>Yes — over $1M</option>
            </select>
            <label for="existing_debt">Existing Business Debt</label>
            <div class="field-error"></div>
          </div>
          <div class="field"><input type="text" id="primary_bank" placeholder=" " /><label for="primary_bank">Primary Bank Name</label></div>
        </div>
      </div>

      <!-- Gold divider -->
      <div class="gold-divider" style="margin: 36px 0;"></div>

      <!-- Program-specific -->
      <div>
        <h4 class="h4" style="margin: 0 0 6px; display:flex; align-items:center; gap:10px;">
          <span style="color: var(--gold); font-size: 12px;">◆</span>
          ${loan.name} — Program Details
        </h4>
        <p style="font-size:12px; color: var(--muted); margin: 0 0 18px;">
          Specific details required for underwriting this program.
        </p>

        <div style="display:grid; grid-template-columns: 1fr; gap: 18px;" class="grid-2col">
          ${loan.specificFields.map(f => renderField(f)).join('')}
        </div>
      </div>
    `;
  }

  function renderStep4Fields(loan) {
    return `
      <div style="display:grid; grid-template-columns: 1fr; gap: 18px;" class="grid-2col">
        <div class="field"><input type="text" id="loan_amount" placeholder=" " required data-rules="required|currency" data-format="currency" /><label for="loan_amount">Desired Loan Amount</label><div class="field-error"></div></div>
        <div class="field">
          <select id="funding_timeline" required data-rules="required">
            <option value="" disabled selected hidden></option>
            <option>Immediate (within 7 days)</option><option>1–2 weeks</option><option>2–4 weeks</option><option>30–60 days</option><option>60+ days</option>
          </select>
          <label for="funding_timeline">Funding Timeline</label>
          <div class="field-error"></div>
        </div>
        <div class="field" style="grid-column: 1 / -1;"><input type="text" id="use_of_funds" placeholder=" " required data-rules="required" /><label for="use_of_funds">Intended Use of Funds</label><div class="field-error"></div></div>
        <div class="field" style="grid-column: 1 / -1;"><textarea id="additional_notes" placeholder=" "></textarea><label for="additional_notes">Additional Notes</label></div>
      </div>

      <!-- Disclosures -->
      <div style="margin-top: 32px; background: var(--ivory-warm); border: 1px solid var(--hairline); border-radius: var(--radius); padding: 22px;">
        <div class="eyebrow" style="margin-bottom: 12px;">Disclosures</div>
        <p style="font-size: 12.5px; color: var(--muted-strong); line-height: 1.7; margin: 0 0 12px;">
          By submitting this application, you authorize Superb Choice Lending and its lending partners to verify the information provided and obtain consumer and business credit reports as part of underwriting review.
        </p>
        <p style="font-size: 12.5px; color: var(--muted-strong); line-height: 1.7; margin: 0;">
          Application does not constitute a commitment to lend. Final terms are determined upon completion of underwriting. Superb Choice Lending is a commercial finance brokerage and not a direct lender in all jurisdictions.
        </p>
      </div>

      <!-- Authorizations -->
      <div style="margin-top: 24px; display: grid; gap: 14px;">
        <label style="display: flex; gap: 12px; align-items: flex-start; cursor: pointer;">
          <input type="checkbox" class="check-box" id="consent_soft" required />
          <span style="font-size: 13.5px; color: var(--navy); line-height: 1.6;">
            <strong style="font-weight: 600;">Soft Credit Authorization.</strong>
            I authorize a soft credit pull for initial pre-qualification. This will not impact my credit score.
          </span>
        </label>
        <label style="display: flex; gap: 12px; align-items: flex-start; cursor: pointer;">
          <input type="checkbox" class="check-box" id="consent_hard" />
          <span style="font-size: 13.5px; color: var(--navy); line-height: 1.6;">
            <strong style="font-weight: 600;">Hard Credit Authorization (optional).</strong>
            Upon term sheet acceptance, I authorize a hard credit pull to finalize underwriting.
          </span>
        </label>
        <label style="display: flex; gap: 12px; align-items: flex-start; cursor: pointer;">
          <input type="checkbox" class="check-box" id="consent_terms" required />
          <span style="font-size: 13.5px; color: var(--navy); line-height: 1.6;">
            <strong style="font-weight: 600;">Terms & Privacy.</strong>
            I have read and agree to the <a href="/terms.html" style="color: var(--gold);">Terms of Service</a> and <a href="/privacy.html" style="color: var(--gold);">Privacy Policy</a>.
          </span>
        </label>
        <label style="display: flex; gap: 12px; align-items: flex-start; cursor: pointer;">
          <input type="checkbox" class="check-box" id="consent_sign" required />
          <span style="font-size: 13.5px; color: var(--navy); line-height: 1.6;">
            <strong style="font-weight: 600;">E-Signature Consent.</strong>
            I confirm electronic signature has the same legal effect as handwritten, and information provided is true and complete.
          </span>
        </label>
      </div>

      <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center; padding: 12px 16px; background: rgba(31,77,58,0.05); border: 1px solid rgba(31,77,58,0.15); border-radius: var(--radius);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" stroke-width="1.8" style="flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        <span style="font-size: 11.5px; color: var(--muted-strong);">Encrypted transmission. We never sell your data to third parties.</span>
      </div>
    `;
  }

  function renderField(f) {
    const rules = f.rules ? `data-rules="${f.rules}"` : '';
    const required = (f.rules || '').includes('required') ? 'required' : '';
    const format = f.format || (f.type === 'currency' ? 'currency' : (f.type === 'number' ? '' : ''));
    const formatAttr = format ? `data-format="${format}"` : '';
    const inputType = f.type === 'currency' ? 'text' : (f.type || 'text');
    const placeholder = f.placeholder ? `placeholder="${f.placeholder}"` : 'placeholder=" "';
    const errBlock = f.rules ? '<div class="field-error"></div>' : '';

    if (f.type === 'select') {
      const opts = (f.options || []).map(o => `<option>${o}</option>`).join('');
      const statesAttr = f.dataAttr === 'states' ? 'data-states' : '';
      return `
        <div class="field">
          <select id="${f.id}" ${required} ${rules} ${statesAttr}>
            <option value="" disabled selected hidden></option>
            ${opts}
          </select>
          <label for="${f.id}">${f.label}</label>
          ${errBlock}
        </div>`;
    }

    return `
      <div class="field">
        <input type="${inputType}" id="${f.id}" ${placeholder} ${required} ${rules} ${formatAttr} />
        <label for="${f.id}">${f.label}</label>
        ${errBlock}
      </div>`;
  }

  // ─── FORM WIZARD LOGIC ──────────────────────────────────
  function wireForm(loan) {
    // Inject responsive grid styles
    if (!document.getElementById('grid-style')) {
      const s = document.createElement('style');
      s.id = 'grid-style';
      s.textContent = `@media (min-width: 640px) { .grid-2col { grid-template-columns: 1fr 1fr !important; } }`;
      document.head.appendChild(s);
    }

    // Auto-wire validation (formatters, etc.)
    if (window.SCLValidation) window.SCLValidation.autoWire();

    let currentStep = 1;
    const totalSteps = 4;
    const stepTitles = {
      1: 'Business Information',
      2: 'Owner Information',
      3: 'Financial & Program Details',
      4: 'Loan Request & Authorization'
    };

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function showStep(n) {
      document.querySelectorAll('.form-step').forEach(el => {
        el.style.display = parseInt(el.dataset.step) === n ? 'block' : 'none';
      });
      currentStep = n;
      document.getElementById('step-current').textContent = n;
      document.getElementById('step-title').textContent = stepTitles[n];
      prevBtn.disabled = n === 1;

      const lbl = nextBtn.querySelector('.btn-label');
      lbl.textContent = n === totalSteps ? 'Submit Application' : 'Continue';

      updateProgress();

      // Scroll form into view
      const form = document.getElementById('loan-form');
      const y = form.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    function updateProgress() {
      // Count filled required fields across all visible steps
      const allRequired = document.querySelectorAll('#loan-form [required]');
      let filled = 0;
      allRequired.forEach(el => {
        const v = el.type === 'checkbox' ? el.checked : el.value.trim();
        if (v) filled++;
      });
      const pct = allRequired.length === 0 ? 0 : Math.round((filled / allRequired.length) * 100);
      document.getElementById('progress-pct').textContent = pct + '%';
      document.getElementById('progress-bar').style.width = pct + '%';
    }

    function validateCurrentStep() {
      const stepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
      const { valid, firstInvalid } = window.SCLValidation.validateForm(stepEl);
      if (!valid) {
        SCL.toast('Please complete the highlighted fields.', { error: true });
        if (firstInvalid) firstInvalid.focus();
      }
      return valid;
    }

    nextBtn.addEventListener('click', () => {
      if (!validateCurrentStep()) return;
      if (currentStep === totalSteps) {
        submitApplication(loan);
      } else {
        showStep(currentStep + 1);
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });

    // Track progress on input
    document.getElementById('loan-form').addEventListener('input', updateProgress);
    document.getElementById('loan-form').addEventListener('change', updateProgress);

    // Enter advances on text inputs
    document.getElementById('loan-form').addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'textarea') {
        e.preventDefault();
        nextBtn.click();
      }
    });
  }

  async function submitApplication(loan) {
    const btn = document.getElementById('next-btn');
    const lbl = btn.querySelector('.btn-label');
    const orig = lbl.textContent;
    btn.disabled = true;
    lbl.innerHTML = '<span class="spinner"></span> Submitting…';

    // Collect all form data
    const form = document.getElementById('loan-form');
    const payload = {
      product_slug: loan.slug,
      product_name: loan.name,
      ref_number: 'SCL-' + Date.now().toString(36).toUpperCase().slice(-8),
      submitted_at: new Date().toISOString(),
      form_data: {}
    };

    form.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.id) {
        payload.form_data[el.id] = el.type === 'checkbox' ? el.checked : el.value;
      }
    });

    try {
      const result = await window.SCLBackend.submitApplication(payload);
      btn.disabled = false;
      lbl.textContent = orig;

      if (result.ok) {
        showSuccessModal(payload.ref_number, loan);
      } else {
        SCL.toast(result.error || 'Submission failed. Please try again.', { error: true });
      }
    } catch (err) {
      btn.disabled = false;
      lbl.textContent = orig;
      SCL.toast('Submission failed. Please try again.', { error: true });
    }
  }

  function showSuccessModal(refNumber, loan) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(14,42,71,0.7);backdrop-filter:blur(8px);padding:16px;';
    modal.innerHTML = `
      <div class="fade-in" style="background: var(--ivory-warm); border-radius: var(--radius-lg); max-width: 520px; width: 100%; overflow: hidden; box-shadow: 0 24px 80px -20px rgba(14,42,71,0.5);">
        <div style="background: var(--navy); color: var(--ivory); padding: 32px; text-align: center; position: relative; overflow: hidden;">
          <div class="pattern-dots-gold" style="position:absolute; inset:0; opacity:0.4;"></div>
          <div style="position: relative;">
            <div style="width: 60px; height: 60px; margin: 0 auto 16px; background: rgba(184,137,62,0.15); border: 1px solid rgba(184,137,62,0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A85C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div class="eyebrow" style="color: var(--gold-light); margin-bottom: 8px;">Application Received</div>
            <h3 class="h3" style="color: var(--ivory); margin: 0;">Your ${loan.name} Application Has Been Received.</h3>
          </div>
        </div>
        <div style="padding: 32px;">
          <div class="gold-divider-short" style="margin: 0 auto 20px;"></div>
          <p style="text-align:center; font-size: 14px; color: var(--muted-strong); line-height: 1.7; margin: 0 0 24px;">
            A senior advisor will personally review your file and reach out within <strong style="color: var(--navy);">one business day</strong> with structured options.
          </p>
          <div style="background: white; border: 1px solid var(--hairline); border-radius: var(--radius); padding: 16px; text-align: center; margin-bottom: 24px;">
            <div class="eyebrow" style="margin-bottom: 4px;">Reference Number</div>
            <div style="font-family: var(--font-display); font-size: 1.3rem; color: var(--navy); font-weight: 500;">${refNumber}</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="/contact.html" class="btn btn-primary">Schedule Consultation</a>
            <a href="/index.html" class="btn btn-outline">Return Home</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Init ───────────────────────────────────────────────
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
