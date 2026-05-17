/* =========================================================
   SCL — Loan Product Catalog
   ---------------------------------------------------------
   Single source of truth for each loan type:
     - SEO metadata
     - Page content (hero, overview, who it's for)
     - Specific form fields (Section 2 of the official PDF)
     - FAQs (drives AEO)
   ========================================================= */

const SCL_LOANS = {

  // ─────────────────────────────────────────────────────
  'working-capital': {
    slug: 'working-capital',
    name: 'Working Capital',
    category: 'Short-Term Liquidity',
    icon: '◐',

    // SEO
    seo: {
      title: 'Working Capital Loans for US Businesses | Superb Choice Lending',
      description: 'Fast working capital financing for US businesses — payroll, inventory, growth capital. $25K–$2M with same-day review. Boca Raton-based, nationwide funding.',
      keywords: 'working capital loan, business cash flow loan, short term business loan, US working capital'
    },

    // Hero copy
    headline: 'Working Capital,',
    headlineAccent: 'When Cashflow',
    headlineEnd: 'Demands It.',
    lede: 'Fast, structured liquidity for operational expenses, inventory cycles, and time-sensitive opportunities. Term sheets in 24–48 hours, funding in 3–5 business days.',

    // Loan terms (for schema + display)
    amount: { min: 25000, max: 2000000 },
    term: { min: 3, max: 24, unit: 'months' },
    speed: '24–48 hour decision',

    // Highlights
    highlights: [
      { label: 'Loan Amount',     value: '$25K – $2M' },
      { label: 'Term',            value: '3 – 24 months' },
      { label: 'Decision',        value: '24–48 hours' },
      { label: 'Funding Speed',   value: '3–5 days' },
    ],

    // Overview content
    overview: 'Working capital financing is purpose-built for operational expenses — payroll, inventory, marketing, supplier payments, and other day-to-day costs that keep your business moving. Unlike asset-backed loans, working capital is unsecured and structured around your business cashflow, not collateral. Repayment is typically tied to revenue patterns rather than fixed monthly amortization.',

    // Who it fits
    whoFor: [
      'Established businesses with 12+ months of operating history',
      'Companies experiencing seasonal cash flow gaps',
      'Operators preparing for inventory buildup or large orders',
      'Businesses bridging gaps between AR collection cycles',
      'Service businesses without significant physical collateral',
    ],

    // Product-specific form fields (from Loan_Type_Form.pdf Section 2 + relevant universal)
    specificFields: [
      { id: 'avg_daily_card_volume', label: 'Average Daily Card Volume', type: 'currency', rules: 'currency' },
      { id: 'avg_daily_bank_balance', label: 'Average Daily Bank Balance', type: 'currency', rules: 'currency' },
      { id: 'nsfs_90', label: 'NSFs in Last 90 Days', type: 'number', rules: 'range:0:100' },
      { id: 'card_vs_ach_percent', label: 'Percentage Card vs. ACH', type: 'text', placeholder: 'e.g. 60/40' },
      { id: 'existing_mca', label: 'Existing MCA / Working Capital Position', type: 'select', options: ['None','One active position','Two or more positions','Recently paid off'], rules: 'required' },
      { id: 'weekly_revenue_pattern', label: 'Weekly Revenue Pattern', type: 'select', options: ['Consistent week-to-week','Slight variance','Highly seasonal','Project-based / lumpy'], rules: 'required' },
    ],

    // FAQs (AEO — these get JSON-LD schema)
    faqs: [
      { q: 'How quickly can I get working capital funding?', a: 'Term sheets are typically issued within 24–48 hours of application. Once signed, funding generally reaches your business account within 3–5 business days, though same-day funding is possible for established files.' },
      { q: 'Do I need collateral for a working capital loan?', a: 'No. Working capital financing is structured as unsecured debt and underwritten primarily against business cashflow rather than physical collateral. Personal guarantees are typically required from owners with 20%+ equity.' },
      { q: 'What are the typical rates on working capital loans?', a: 'Rates vary based on credit profile, time in business, and revenue stability. For qualified borrowers, factor rates typically range from 1.10 to 1.40, equivalent to an APR range that depends on term length.' },
      { q: 'How much can I borrow?', a: 'Loan amounts generally range from $25,000 to $2,000,000. The maximum is typically capped at 10%–20% of annual gross revenue, depending on the structure.' },
      { q: 'Will applying affect my credit score?', a: 'The initial pre-qualification is conducted with a soft credit pull, which does not impact your credit score. A hard pull is only performed if you wish to proceed with a final term sheet.' },
      { q: 'Can I qualify with less-than-perfect credit?', a: 'Yes. Working capital underwriting weighs business performance and cashflow more heavily than personal credit. We have placed capital for businesses with credit scores in the 580–660 range when revenue and deposit history are strong.' },
    ]
  },

  // ─────────────────────────────────────────────────────
  'term-loan': {
    slug: 'term-loan',
    name: 'Business Term Loan',
    category: 'Structured Debt',
    icon: '◑',
    seo: {
      title: 'Business Term Loans | Structured Debt Financing | Superb Choice Lending',
      description: 'Fixed-term business loans for growth, expansion, and capital investments. $50K–$5M, terms 1–10 years. Conventional and SBA programs available.',
      keywords: 'business term loan, structured debt, business expansion loan, SBA loan alternative'
    },
    headline: 'Structured Term Debt',
    headlineAccent: 'For Strategic',
    headlineEnd: 'Growth.',
    lede: 'Fixed-term financing engineered for businesses with clear capital deployment plans. Amortized structures, predictable payments, conventional and SBA-eligible programs.',
    amount: { min: 50000, max: 5000000 },
    term: { min: 12, max: 120, unit: 'months' },
    speed: '3–7 business day decision',
    highlights: [
      { label: 'Loan Amount',     value: '$50K – $5M' },
      { label: 'Term',            value: '1 – 10 years' },
      { label: 'Decision',        value: '3–7 days' },
      { label: 'Structure',       value: 'Fixed amortization' },
    ],
    overview: 'A business term loan is structured debt with a defined repayment schedule, fixed or variable interest rate, and amortization over a set period. Terms typically range from 1 to 10 years depending on use of funds and collateral profile. Term loans are appropriate for capital investments with clear ROI — equipment, build-outs, acquisitions, or refinancing more expensive debt.',
    whoFor: [
      'Profitable businesses with 2+ years of operating history',
      'Operators planning expansion, acquisition, or refinancing',
      'Businesses with collateral or strong cashflow coverage',
      'Companies seeking predictable monthly payments',
      'Owners with 680+ personal credit looking for SBA-eligible programs',
    ],
    specificFields: [
      { id: 'net_profit_ly', label: 'Net Profit (Last Full Year)', type: 'currency', rules: 'currency' },
      { id: 'ebitda', label: 'EBITDA (Last Full Year)', type: 'currency', rules: 'currency' },
      { id: 'gross_profit_margin', label: 'Gross Profit Margin (%)', type: 'number', rules: 'range:0:100' },
      { id: 'collateral_available', label: 'Collateral Available?', type: 'select', options: ['Real estate','Equipment','Inventory','Accounts receivable','Multiple types','None'], rules: 'required' },
      { id: 'bankruptcies', label: 'Bankruptcies (Personal or Business)?', type: 'select', options: ['None','Discharged 7+ years','Discharged 2–7 years','Discharged within 2 years','Currently filed'], rules: 'required' },
      { id: 'judgments_liens', label: 'Judgments or Liens?', type: 'select', options: ['None','Resolved','Open / Active'], rules: 'required' },
      { id: 'tax_obligations', label: 'Outstanding Tax Obligations?', type: 'select', options: ['None','On payment plan','Outstanding, unpaid'], rules: 'required' },
    ],
    faqs: [
      { q: 'What is the difference between an SBA loan and a conventional term loan?', a: 'SBA 7(a) and 504 loans carry partial government guarantees, allowing lenders to extend longer terms (up to 25 years for real estate) at lower rates. Conventional term loans price purely on bank credit risk and typically have shorter terms (1–7 years) with faster approval timelines. SBA programs require more documentation and 30–90 day funding timelines.' },
      { q: 'How long can business term loans be amortized?', a: 'Conventional term loans typically amortize over 1–7 years. SBA loans extend to 10 years for working capital and equipment, and up to 25 years for real estate. Equipment-secured loans often match the useful life of the asset.' },
      { q: 'Do term loans require collateral?', a: 'Most term loans above $250,000 are collateralized — either by specific assets (equipment, real estate) or by a blanket UCC lien on business assets. Smaller term loans may be unsecured but require personal guarantees from majority owners.' },
      { q: 'What documentation is required?', a: 'Standard packages include: 2–3 years of business tax returns, 2 years of personal tax returns from owners, YTD profit & loss and balance sheet, 6 months of bank statements, debt schedule, and Articles of Organization or Incorporation.' },
      { q: 'Can I prepay a term loan early?', a: 'Conventional term loans typically include prepayment penalties for the first 1–3 years (often declining over time). SBA loans have prepayment penalties only for loans with terms of 15 years or more. We disclose all prepayment terms in writing before signing.' },
      { q: 'What is the minimum credit score for a term loan?', a: 'For conventional programs, owners typically need 680+ personal credit. SBA programs may accept 650+ with strong compensating factors. Below 650, structured alternatives like working capital or revenue-based financing become more appropriate.' },
    ]
  },

  // ─────────────────────────────────────────────────────
  'line-of-credit': {
    slug: 'line-of-credit',
    name: 'Business Line of Credit',
    category: 'Revolving Facility',
    icon: '◒',
    seo: {
      title: 'Business Line of Credit | Revolving Facilities | Superb Choice Lending',
      description: 'Flexible revolving credit lines for US businesses. Draw what you need, pay interest only on outstanding balance. $25K–$1M committed lines.',
      keywords: 'business line of credit, revolving credit, LOC, business credit line'
    },
    headline: 'A Revolving Line,',
    headlineAccent: 'Always Available',
    headlineEnd: 'When Needed.',
    lede: 'A committed credit facility that lets you draw, repay, and re-draw as the business requires. Interest only on outstanding balance — capital that waits for your call.',
    amount: { min: 25000, max: 1000000 },
    term: { min: 12, max: 36, unit: 'months' },
    speed: '5–10 business day decision',
    highlights: [
      { label: 'Line Amount',     value: '$25K – $1M' },
      { label: 'Term',            value: '12 – 36 months' },
      { label: 'Interest',        value: 'On drawn balance only' },
      { label: 'Renewable',       value: 'Annual review' },
    ],
    overview: 'A business line of credit is a committed revolving facility — once approved, you can draw any amount up to your credit limit, repay, and re-draw repeatedly throughout the term. You pay interest only on what you actually use, not the full committed amount. Lines are typically renewed annually subject to performance review.',
    whoFor: [
      'Businesses with variable or seasonal cash needs',
      'Operators wanting capital available but not deployed',
      'Companies managing AR/AP timing mismatches',
      'Businesses with consistent revenue and 2+ years of operating history',
      'Companies that need flexibility without commitment to a fixed-term loan',
    ],
    specificFields: [
      { id: 'avg_monthly_deposits', label: 'Average Monthly Deposits', type: 'currency', rules: 'currency' },
      { id: 'num_monthly_deposits', label: 'Number of Monthly Deposits', type: 'number', rules: 'range:0:1000' },
      { id: 'avg_daily_balance', label: 'Average Daily Balance', type: 'currency', rules: 'currency' },
      { id: 'nsfs_90_loc', label: 'NSFs in Last 90 Days', type: 'number', rules: 'range:0:100' },
      { id: 'seasonal_fluctuations', label: 'Seasonal Revenue Fluctuations?', type: 'select', options: ['Year-round consistent','Mildly seasonal','Strongly seasonal','Project-based'], rules: 'required' },
      { id: 'existing_loc', label: 'Existing Line of Credit?', type: 'select', options: ['None','Under $100K','$100K–$500K','Over $500K'], rules: 'required' },
      { id: 'existing_loc_balance', label: 'Existing LOC Outstanding Balance', type: 'currency', rules: 'currency' },
    ],
    faqs: [
      { q: 'How is a line of credit different from a term loan?', a: 'A term loan disburses a fixed lump sum that you repay over a set schedule. A line of credit gives you a credit limit you can draw against repeatedly — borrow $50K today, repay it in 60 days, draw $80K next month. You only pay interest on the outstanding balance, not the full credit limit.' },
      { q: 'When should I use a line of credit versus a term loan?', a: 'Lines of credit are ideal for variable, recurring, or short-term capital needs — inventory cycles, AR/AP gaps, opportunistic purchases. Term loans are better for one-time capital deployments with clear repayment timelines — equipment purchases, build-outs, refinancing.' },
      { q: 'How long does an LOC stay open?', a: 'Most committed lines have an initial term of 12–36 months with automatic annual renewals subject to financial review. Performance, deposit patterns, and credit are reassessed each renewal.' },
      { q: 'Is there a draw fee?', a: 'Most credit lines charge no fees per draw, though some carry an annual maintenance or unused-line fee (typically 0.25%–0.50% of the undrawn portion). All fees are disclosed in the term sheet.' },
      { q: 'How quickly can I draw funds?', a: 'Once your line is established, draws typically clear via ACH within 1 business day. Some facilities offer same-day wire transfers for an additional fee.' },
      { q: 'What revenue do I need to qualify?', a: 'Most committed lines require minimum annual revenue of $250,000, 2+ years in business, and consistent monthly deposit patterns. Smaller lines may qualify with $150K revenue and 12+ months of history.' },
    ]
  },

  // ─────────────────────────────────────────────────────
  'mca': {
    slug: 'mca',
    name: 'Merchant Cash Advance',
    category: 'Revenue-Based Financing',
    icon: '◓',
    seo: {
      title: 'Merchant Cash Advance (MCA) | Revenue-Based Funding | Superb Choice Lending',
      description: 'Fast revenue-based business funding. Approval based on monthly revenue, not credit alone. $10K–$500K with same-day decisions.',
      keywords: 'merchant cash advance, MCA, revenue based financing, fast business funding'
    },
    headline: 'Capital Structured',
    headlineAccent: 'Around Revenue,',
    headlineEnd: 'Not Credit.',
    lede: 'Revenue-based advances that price against monthly receipts rather than balance sheets. Same-day decisions, funding in 24–72 hours, repaid as a small percentage of daily sales.',
    amount: { min: 10000, max: 500000 },
    term: { min: 3, max: 18, unit: 'months' },
    speed: 'Same-day decision',
    highlights: [
      { label: 'Advance Amount',  value: '$10K – $500K' },
      { label: 'Term',            value: '3 – 18 months' },
      { label: 'Decision',        value: 'Same day' },
      { label: 'Repayment',       value: '% of daily revenue' },
    ],
    overview: 'A merchant cash advance is the purchase of future receivables at a discount. Rather than a traditional loan, the funder advances you capital today in exchange for a specified percentage of your future credit card or ACH revenue until a fixed total is repaid. Because repayment scales with revenue, slow days carry smaller payments. MCAs are unsecured and typically funded within 24–72 hours.',
    whoFor: [
      'Businesses with consistent monthly revenue but imperfect credit',
      'Operators needing capital faster than traditional underwriting allows',
      'Retail, restaurant, and service businesses with strong card volume',
      'Companies that have been declined for conventional loans',
      'Businesses needing capital for time-sensitive opportunities',
    ],
    specificFields: [
      { id: 'avg_daily_card_volume_mca', label: 'Average Daily Card Volume', type: 'currency', rules: 'currency' },
      { id: 'avg_daily_bank_balance_mca', label: 'Average Daily Bank Balance', type: 'currency', rules: 'currency' },
      { id: 'nsfs_mca', label: 'NSFs in Last 90 Days', type: 'number', rules: 'range:0:100' },
      { id: 'weekly_revenue_pattern_mca', label: 'Weekly Revenue Pattern', type: 'select', options: ['Consistent','Slight variance','Highly seasonal','Lumpy / project-based'], rules: 'required' },
      { id: 'card_vs_ach_pct', label: 'Percentage Card vs. ACH', type: 'text', placeholder: 'e.g. 70/30' },
      { id: 'existing_mca_position', label: 'Existing MCA Position?', type: 'select', options: ['None','One active position','Two positions','Three+ positions','Recently paid off'], rules: 'required' },
      { id: 'processor_name', label: 'Card Processor Name (if applicable)', type: 'text' },
    ],
    faqs: [
      { q: 'Is an MCA technically a loan?', a: 'No — legally, a merchant cash advance is the sale of future receivables, not a loan. There is no fixed term, no interest rate in the traditional sense, and no amortization schedule. You repay a fixed total (the "purchased amount") via a percentage of daily revenue until satisfied.' },
      { q: 'What is a factor rate?', a: 'A factor rate is the multiplier that determines total repayment. If you receive $50,000 with a 1.30 factor rate, you repay $65,000 total. Factor rates typically range from 1.15 to 1.50 depending on risk profile.' },
      { q: 'How is an MCA repaid?', a: 'Most MCAs use one of two repayment methods: (1) automatic deduction of a fixed percentage from daily credit card receipts, or (2) fixed daily or weekly ACH withdrawals from your business account. Card-split arrangements scale with your actual sales.' },
      { q: 'Can I get an MCA with bad credit?', a: 'Yes — MCA underwriting weighs business revenue and deposit history far more heavily than personal credit. Approvals are common with personal credit scores in the 500–620 range, provided monthly revenue is consistent and there are minimal NSFs.' },
      { q: 'What\'s the catch with MCAs?', a: 'MCAs carry the highest effective cost of any commercial financing product — equivalent APRs can exceed 60%. They\'re appropriate for short-term, high-ROI deployments but inappropriate for low-margin recurring expenses. We will tell you honestly when an MCA is not the right fit.' },
      { q: 'How fast can I get funded?', a: 'Same-day decisions are routine. Funding typically lands in your account within 24–72 hours of signed contract, sometimes same-day for established files.' },
    ]
  },

  // ─────────────────────────────────────────────────────
  'equipment-financing': {
    slug: 'equipment-financing',
    name: 'Equipment Financing',
    category: 'Asset-Backed Lending',
    icon: '◔',
    seo: {
      title: 'Equipment Financing & Leasing | Section 179 Eligible | Superb Choice Lending',
      description: 'Finance new or used commercial equipment with 100% LTV programs. Section 179 eligible. $25K–$5M for vehicles, machinery, tech, medical equipment.',
      keywords: 'equipment financing, equipment leasing, section 179, commercial equipment loan'
    },
    headline: 'Equipment That Earns',
    headlineAccent: 'Should Finance',
    headlineEnd: 'Itself.',
    lede: 'Asset-backed financing for new or used commercial equipment — vehicles, machinery, technology, medical, restaurant. Section 179 eligible. Up to 100% financing with the equipment as collateral.',
    amount: { min: 25000, max: 5000000 },
    term: { min: 24, max: 84, unit: 'months' },
    speed: '24–72 hour decision',
    highlights: [
      { label: 'Loan Amount',     value: '$25K – $5M' },
      { label: 'Term',            value: '2 – 7 years' },
      { label: 'LTV',             value: 'Up to 100%' },
      { label: 'Tax Treatment',   value: 'Section 179 eligible' },
    ],
    overview: 'Equipment financing is asset-backed lending where the equipment itself secures the loan. Because the lender has clear collateral, terms are typically more favorable than unsecured options — longer amortization, lower rates, and higher LTV ratios. Both new and used equipment qualify, as do equipment leases that convert to ownership at term-end (capital leases).',
    whoFor: [
      'Construction, trucking, manufacturing, and logistics operators',
      'Medical and dental practices acquiring diagnostic equipment',
      'Restaurants and food service operators outfitting locations',
      'Technology and software businesses scaling hardware infrastructure',
      'Owner-operators wanting to preserve cash by financing assets',
    ],
    specificFields: [
      { id: 'equipment_type', label: 'Equipment Type / Description', type: 'text', rules: 'required' },
      { id: 'equipment_new_used', label: 'New or Used', type: 'select', options: ['New','Used','Refurbished'], rules: 'required' },
      { id: 'vendor_name', label: 'Vendor / Dealer Name', type: 'text' },
      { id: 'serial_number', label: 'Serial Number (if known)', type: 'text' },
      { id: 'equipment_location', label: 'Equipment Location (City, State)', type: 'text' },
      { id: 'purchase_price', label: 'Purchase Price', type: 'currency', rules: 'currency|required' },
      { id: 'down_payment_amt', label: 'Down Payment Amount', type: 'currency', rules: 'currency' },
      { id: 'invoice_uploaded', label: 'Vendor Invoice / Quote Available?', type: 'select', options: ['Yes — ready to upload','Yes — pending','Not yet'], rules: 'required' },
    ],
    faqs: [
      { q: 'Can I finance used equipment?', a: 'Yes. Used equipment is regularly financed, though lenders may cap the loan term to the remaining useful life of the asset. Equipment older than 10–15 years typically requires inspection and may carry adjusted LTV ratios.' },
      { q: 'What is Section 179?', a: 'Section 179 of the IRS tax code allows businesses to deduct the full purchase price of qualifying equipment in the year it\'s placed in service, up to an annual limit ($1,160,000 for 2024, adjusted annually for inflation). Combined with bonus depreciation, this can effectively reduce the after-tax cost of equipment significantly.' },
      { q: 'Lease or loan — which is better?', a: 'An equipment loan finances the purchase and you own the asset outright at the end of the term. A lease typically has lower monthly payments and may have a buyout (e.g., $1 buyout or 10% residual) at the end. Capital leases qualify for Section 179; operating leases generally don\'t. We model both for you before recommending one.' },
      { q: 'How much down payment is required?', a: 'For qualified borrowers, equipment financing often requires 0–10% down. Some programs offer 100% financing including soft costs (installation, delivery, training). Lower credit profiles or older used equipment may require 15–25% down.' },
      { q: 'What documentation is needed?', a: 'Vendor invoice or quote, equipment specifications, last 3–6 months of bank statements, owner ID, and basic application. For loans over $250K, business tax returns and financials are typically required.' },
      { q: 'Can I finance soft costs like installation and shipping?', a: 'Yes. Most equipment financing programs allow you to bundle delivery, installation, training, and extended warranties into the loan amount, typically up to 25% of the hard equipment cost.' },
    ]
  },

  // ─────────────────────────────────────────────────────
  'factoring': {
    slug: 'factoring',
    name: 'Invoice Factoring',
    category: 'Receivables Financing',
    icon: '◕',
    seo: {
      title: 'Invoice Factoring for US Businesses | Superb Choice Lending',
      description: 'Sell outstanding invoices for immediate cash. 80–95% advance rates. No debt added to balance sheet. B2B businesses across all 50 states.',
      keywords: 'invoice factoring, accounts receivable factoring, factoring company, invoice financing'
    },
    headline: 'Your Invoices Are',
    headlineAccent: 'Working Capital.',
    headlineEnd: 'Liberate Them.',
    lede: 'Sell outstanding B2B invoices for immediate cash — typically 80–95% of face value within 24 hours. No new debt on your balance sheet, no waiting 30–90 days for client payment.',
    amount: { min: 50000, max: 10000000 },
    term: { min: 1, max: 12, unit: 'months' },
    speed: '5–10 day setup, 24hr funding after',
    highlights: [
      { label: 'Advance Rate',    value: '80% – 95%' },
      { label: 'Setup Time',      value: '5–10 days' },
      { label: 'Funding After',   value: '24 hours' },
      { label: 'Facility Size',   value: '$50K – $10M' },
    ],
    overview: 'Invoice factoring is the sale of your accounts receivable to a factor at a discount. You receive immediate cash (typically 80–95% of face value), and the factor collects from your customer when the invoice matures, returning the reserve minus their fee. Factoring is not a loan — it does not add debt to your balance sheet. It is particularly useful for B2B businesses with long customer payment cycles.',
    whoFor: [
      'B2B businesses invoicing creditworthy commercial or government customers',
      'Companies with customer payment terms of net-30, net-60, or net-90',
      'Staffing, trucking, manufacturing, and service businesses',
      'Operators experiencing rapid growth but constrained by AR timing',
      'Businesses ineligible for traditional credit due to short operating history',
    ],
    specificFields: [
      { id: 'monthly_invoice_volume', label: 'Monthly Invoice Volume', type: 'currency', rules: 'currency|required' },
      { id: 'avg_invoice_size', label: 'Average Invoice Size', type: 'currency', rules: 'currency' },
      { id: 'invoice_terms', label: 'Typical Invoice Terms', type: 'select', options: ['Net-15','Net-30','Net-45','Net-60','Net-90','Variable'], rules: 'required' },
      { id: 'num_customers', label: 'Total Number of Active Customers', type: 'number', rules: 'range:0:10000' },
      { id: 'top_3_customers', label: 'Top 3 Customers (Names)', type: 'text', placeholder: 'Used for credit verification' },
      { id: 'customer_concentration', label: 'Largest Customer % of Revenue', type: 'number', rules: 'range:0:100' },
      { id: 'industry_factoring', label: 'Industry', type: 'select', options: ['Staffing / Temp','Trucking / Freight','Manufacturing','Wholesale / Distribution','Construction','Oil & Gas Services','Government Contracting','Technology Services','Other B2B'], rules: 'required' },
    ],
    faqs: [
      { q: 'Is factoring a loan?', a: 'No. Factoring is the sale of an asset (your invoice) to a third party. Your balance sheet shows a reduction in AR and an increase in cash, but no debt is added. This makes factoring particularly valuable for businesses seeking to preserve their debt capacity for other purposes.' },
      { q: 'What is recourse vs. non-recourse factoring?', a: 'In recourse factoring, you remain liable if your customer doesn\'t pay the invoice — the factor can require you to buy back the receivable. In non-recourse factoring, the factor assumes credit risk for the customer\'s non-payment (but not for disputes). Non-recourse typically carries higher fees.' },
      { q: 'How much does factoring cost?', a: 'Factoring fees typically range from 1% to 5% of invoice face value per 30-day period. Pricing depends on customer creditworthiness, invoice size, monthly volume, and recourse type. Larger volumes and stronger customers earn lower rates.' },
      { q: 'Will my customers know I\'m factoring?', a: 'In most arrangements (notification factoring), yes — payments are remitted directly to a lockbox controlled by the factor, and customers receive a notice of assignment. Non-notification factoring exists but is less common and typically requires very strong credit.' },
      { q: 'Can I factor only some of my invoices?', a: 'Some factors offer spot factoring (one invoice at a time), but most require commitment to a minimum monthly volume — typically 60%–80% of your AR. Spot factoring carries higher fees due to operational overhead.' },
      { q: 'How quickly do I get funded?', a: 'Initial setup typically takes 5–10 business days for credit checks, contract execution, and notification of customers. After setup, individual invoices fund within 24 hours of submission and verification.' },
    ]
  },

  // ─────────────────────────────────────────────────────
  'ar-financing': {
    slug: 'ar-financing',
    name: 'Accounts Receivable Financing',
    category: 'Receivables Lending',
    icon: '◖',
    seo: {
      title: 'Accounts Receivable Financing | A/R Loans | Superb Choice Lending',
      description: 'Borrow against your outstanding receivables without selling them. Confidential, retains customer relationships. $100K–$10M facilities.',
      keywords: 'accounts receivable financing, AR financing, AR loan, receivables lending'
    },
    headline: 'Borrow Against',
    headlineAccent: 'Receivables.',
    headlineEnd: 'Keep Control.',
    lede: 'A revolving credit facility secured by your A/R, structured as a true loan — not a sale. Confidential to your customers, retains your collection process, and scales with your invoicing.',
    amount: { min: 100000, max: 10000000 },
    term: { min: 12, max: 36, unit: 'months' },
    speed: '7–14 day setup',
    highlights: [
      { label: 'Facility',        value: '$100K – $10M' },
      { label: 'Advance Rate',    value: '70% – 90% of AR' },
      { label: 'Structure',       value: 'Revolving loan' },
      { label: 'Customer Notice', value: 'Confidential' },
    ],
    overview: 'Accounts receivable financing is a credit facility secured by your receivables, but unlike factoring, you retain ownership of the invoices and continue collecting from customers directly. The lender advances a percentage of eligible AR (typically 70%–90%), and the facility revolves as you invoice new receivables and collect on old ones. Customer relationships remain confidential — most AR financing is invisible to your customers.',
    whoFor: [
      'Established B2B businesses with $1M+ in annual revenue',
      'Operators wanting capital from AR without disrupting customer relationships',
      'Companies with strong financial reporting and AR systems',
      'Businesses with diverse customer concentration (no one customer over 25–30%)',
      'Companies graduating from factoring to more institutional financing',
    ],
    specificFields: [
      { id: 'monthly_invoice_volume_ar', label: 'Monthly Invoice Volume', type: 'currency', rules: 'currency|required' },
      { id: 'avg_days_to_collect', label: 'Average Days to Collect (DSO)', type: 'number', rules: 'range:0:365' },
      { id: 'collections_history', label: 'Collections Experience (Last 12 Months)', type: 'select', options: ['Excellent — <2% write-offs','Good — 2–5% write-offs','Average — 5–10% write-offs','Challenging — >10% write-offs'], rules: 'required' },
      { id: 'customer_concentration_ar', label: 'Largest Customer % of AR', type: 'number', rules: 'range:0:100' },
      { id: 'invoice_terms_ar', label: 'Typical Invoice Terms', type: 'select', options: ['Net-15','Net-30','Net-45','Net-60','Net-90','Variable'], rules: 'required' },
      { id: 'ucc_filings', label: 'Existing UCC Filings on AR?', type: 'select', options: ['None','One — minor (equipment, etc.)','One — blanket lien','Multiple filings'], rules: 'required' },
      { id: 'ar_aging_breakdown', label: 'Approximate % of AR Aged >60 Days', type: 'number', rules: 'range:0:100' },
    ],
    faqs: [
      { q: 'How is A/R financing different from factoring?', a: 'In factoring, you sell your invoices to a third party who collects from your customer. In A/R financing, you borrow against your invoices but retain ownership, and you continue collecting from your customers directly. A/R financing is typically confidential — your customers don\'t know financing is in place — while factoring is usually disclosed.' },
      { q: 'What is the typical advance rate?', a: 'Advance rates on A/R financing range from 70% to 90% of eligible receivables. "Eligible" typically excludes invoices over 60–90 days old, foreign receivables, government contracts (without specific approval), and concentrated customer exposures above 20–30%.' },
      { q: 'How does pricing compare to factoring?', a: 'A/R financing is typically priced as an interest rate on the drawn balance (often Prime + 2–6%), plus an annual facility fee. Total all-in cost is usually 50%–70% of equivalent factoring fees, making it more economical for businesses with strong financial reporting and the operational capacity to manage their own AR.' },
      { q: 'What is a borrowing base certificate?', a: 'A weekly or monthly report you submit to the lender showing your current eligible AR. The lender advances a percentage of this base. As you invoice new receivables and collect existing ones, the borrowing base — and therefore your available credit — adjusts automatically.' },
      { q: 'What does "blanket UCC lien" mean?', a: 'A blanket UCC-1 filing is a public lien registered with the secretary of state declaring the lender\'s security interest in your business assets (typically AR, inventory, equipment). It does not affect ownership but prevents you from pledging the same assets to another lender. It\'s released when the facility is paid off.' },
      { q: 'Can I have AR financing alongside other debt?', a: 'Yes, with intercreditor agreements that specify which lender has priority on which assets. AR financing typically takes first position on receivables, while equipment loans take priority on the specific equipment they finance.' },
    ]
  },

  // ─────────────────────────────────────────────────────
  'commercial-real-estate': {
    slug: 'commercial-real-estate',
    name: 'Commercial Real Estate',
    category: 'CRE Financing',
    icon: '◗',
    seo: {
      title: 'Commercial Real Estate Loans | CRE Financing | Superb Choice Lending',
      description: 'Commercial real estate financing for acquisition, refinance, and construction. Up to $50M. Multifamily, office, retail, industrial, hospitality.',
      keywords: 'commercial real estate loan, CRE financing, commercial mortgage, DSCR loan'
    },
    headline: 'Capital For',
    headlineAccent: 'The Buildings',
    headlineEnd: 'You Build Around.',
    lede: 'Acquisition, refinance, and construction financing for commercial real estate operators. Conventional, SBA 504, bridge, and DSCR programs — structured to your asset class and exit strategy.',
    amount: { min: 250000, max: 50000000 },
    term: { min: 12, max: 360, unit: 'months' },
    speed: '14–45 day close',
    highlights: [
      { label: 'Loan Amount',     value: '$250K – $50M' },
      { label: 'Term',            value: '1 – 30 years' },
      { label: 'LTV',             value: 'Up to 80%' },
      { label: 'Programs',        value: 'Conv, SBA, Bridge, DSCR' },
    ],
    overview: 'Commercial real estate financing covers acquisition, refinance, cash-out, and construction across all major property types — multifamily, office, retail, industrial, hospitality, mixed-use, and special-purpose. We structure conventional bank financing, SBA 504 owner-occupied loans, bridge debt, DSCR investor loans, and construction-to-permanent programs. Each transaction is matched to the property\'s economics, the borrower\'s profile, and the exit strategy.',
    whoFor: [
      'Real estate investors acquiring or refinancing income property',
      'Owner-occupied business buyers (SBA 504 eligible)',
      'Developers seeking construction or value-add bridge debt',
      'Operators executing 1031 exchanges with timing-sensitive closings',
      'Foreign nationals investing in US real estate (specialty programs)',
    ],
    specificFields: [
      { id: 'property_address', label: 'Property Address', type: 'text', rules: 'required' },
      { id: 'property_city', label: 'Property City', type: 'text', rules: 'required' },
      { id: 'property_state', label: 'Property State', type: 'select', dataAttr: 'states', rules: 'required|state' },
      { id: 'property_zip', label: 'Property ZIP Code', type: 'text', format: 'zip', rules: 'required|zip' },
      { id: 'property_type', label: 'Property Type', type: 'select', options: ['Multifamily (5+ units)','Office','Retail','Industrial / Warehouse','Mixed-Use','Hospitality / Hotel','Self-Storage','Medical Office','Special-Purpose'], rules: 'required' },
      { id: 'occupancy_pct', label: 'Current Occupancy (%)', type: 'number', rules: 'range:0:100' },
      { id: 'square_footage', label: 'Square Footage / Unit Count', type: 'text' },
      { id: 'year_built', label: 'Year Built', type: 'number', rules: 'range:1800:2030' },
      { id: 'transaction_type', label: 'Purchase / Refinance / Cash-Out / Construction', type: 'select', options: ['Purchase','Rate/Term Refinance','Cash-Out Refinance','Construction','Bridge / Value-Add'], rules: 'required' },
      { id: 'purchase_or_value', label: 'Purchase Price / Current Value', type: 'currency', rules: 'currency|required' },
      { id: 'down_payment_cre', label: 'Down Payment / Equity', type: 'currency', rules: 'currency' },
      { id: 'noi', label: 'Net Operating Income (NOI)', type: 'currency', rules: 'currency' },
      { id: 'borrower_net_worth', label: 'Borrower Net Worth', type: 'currency', rules: 'currency' },
      { id: 'liquidity', label: 'Liquidity (Post-Closing)', type: 'currency', rules: 'currency' },
      { id: 're_experience', label: 'CRE Investment Experience', type: 'select', options: ['First commercial property','1–3 prior transactions','4–10 prior transactions','10+ prior transactions','Institutional / sponsor'], rules: 'required' },
    ],
    faqs: [
      { q: 'What is DSCR and why does it matter?', a: 'Debt-Service Coverage Ratio (DSCR) measures whether the property\'s income covers its debt payment. DSCR = Net Operating Income ÷ Annual Debt Service. Most CRE lenders require DSCR of 1.20–1.30+ at minimum. A DSCR of 1.25 means the property generates 125% of the debt payment in net income.' },
      { q: 'What\'s the difference between recourse and non-recourse?', a: 'Recourse loans hold the borrower personally liable if the property\'s value doesn\'t cover the debt at default. Non-recourse loans limit the lender\'s remedy to the property itself, with standard "bad-boy carve-outs" (fraud, environmental damage, etc.). Most institutional CRE debt over $5M is non-recourse; smaller deals are typically recourse.' },
      { q: 'How long does a CRE closing take?', a: 'Conventional CRE deals typically close in 30–45 days. Bridge and DSCR loans can close in 14–21 days. SBA 504 loans require 45–90 days due to dual-lender coordination. Construction loans are 45–60 days. We provide a realistic timeline upfront.' },
      { q: 'What is an SBA 504 loan?', a: 'SBA 504 is a public-private partnership for owner-occupied commercial real estate (the business must occupy at least 51% of the property). Typical structure: 50% conventional first mortgage, 40% SBA-backed second, 10% borrower down payment. The SBA portion carries below-market fixed rates locked for 25 years.' },
      { q: 'What about bridge loans for CRE?', a: 'Bridge debt covers the gap between acquisition and stabilization or refinance. Common uses: value-add renovation, lease-up of vacant space, repositioning, or timing-sensitive acquisitions. Bridge terms are typically 12–36 months at higher rates than permanent financing, designed to be refinanced when the property stabilizes.' },
      { q: 'What documentation is required?', a: 'Standard CRE underwriting includes: purchase contract or appraisal, rent roll, T-12 (trailing 12-month operating statement), operating expense detail, environmental report (Phase I), property condition report, borrower financial statement, tax returns (2–3 years), and entity formation documents.' },
    ]
  },
};

window.SCL_LOANS = SCL_LOANS;
