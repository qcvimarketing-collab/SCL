/* =========================================================
   SCL — SEO/AEO/GEO Helpers
   Injects structured data on every page.
   ========================================================= */

const SCL_ORG = {
  name: 'Superb Choice Lending',
  legalName: 'Superb Choice Lending LLC',
  url: 'https://superbchoicelending.com',
  logo: 'https://superbchoicelending.com/assets/img/logo-horizontal.png',
  description: 'A boutique commercial finance brokerage placing structured capital for businesses, investors, and real estate operators across all 50 states.',
  founded: '2014',
  telephone: '+1-561-999-8888',
  email: 'advisors@superbchoicelending.com',
  address: {
    streetAddress: '1 Town Center Road, Suite 700',
    addressLocality: 'Boca Raton',
    addressRegion: 'FL',
    postalCode: '33486',
    addressCountry: 'US'
  },
  geo: { lat: 26.3683, lng: -80.1289 },
  social: [
    'https://www.linkedin.com/company/superbchoicelending',
  ],
  slogan: 'Integritas · Diligentia · Fiducia',
};

// ─── Organization + LocalBusiness schema (used on every page) ───
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService", "LocalBusiness"],
    "name": SCL_ORG.name,
    "legalName": SCL_ORG.legalName,
    "url": SCL_ORG.url,
    "logo": SCL_ORG.logo,
    "image": SCL_ORG.logo,
    "description": SCL_ORG.description,
    "foundingDate": SCL_ORG.founded,
    "telephone": SCL_ORG.telephone,
    "email": SCL_ORG.email,
    "slogan": SCL_ORG.slogan,
    "address": {
      "@type": "PostalAddress",
      ...SCL_ORG.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SCL_ORG.geo.lat,
      "longitude": SCL_ORG.geo.lng
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "Commercial Lending",
      "Business Loans",
      "Working Capital Loans",
      "Lines of Credit",
      "Equipment Financing",
      "Commercial Real Estate Financing",
      "Merchant Cash Advances",
      "Invoice Factoring",
      "Accounts Receivable Financing"
    ],
    "priceRange": "$$$",
    "sameAs": SCL_ORG.social,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };
}

// ─── LoanOrCredit schema for individual loan-type pages ───
function getLoanSchema(loan) {
  return {
    "@context": "https://schema.org",
    "@type": "LoanOrCredit",
    "name": loan.name,
    "description": loan.description,
    "url": loan.url,
    "provider": {
      "@type": "FinancialService",
      "name": SCL_ORG.name,
      "url": SCL_ORG.url
    },
    "areaServed": "US",
    "loanTerm": loan.term ? {
      "@type": "QuantitativeValue",
      "minValue": loan.term.min,
      "maxValue": loan.term.max,
      "unitCode": "MON"
    } : undefined,
    "amount": loan.amount ? {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "minValue": loan.amount.min,
      "maxValue": loan.amount.max
    } : undefined,
    "currency": "USD"
  };
}

// ─── FAQPage schema ───
function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
}

// ─── BreadcrumbList schema ───
function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// ─── Article schema (blog posts) ───
function getArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover_image || SCL_ORG.logo,
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": {
      "@type": "Organization",
      "name": post.author || SCL_ORG.name
    },
    "publisher": {
      "@type": "Organization",
      "name": SCL_ORG.name,
      "logo": {
        "@type": "ImageObject",
        "url": SCL_ORG.logo
      }
    },
    "mainEntityOfPage": post.url
  };
}

// ─── Inject schema into <head> ───
function injectSchema(...schemas) {
  schemas.flat().forEach(schema => {
    if (!schema) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

window.SCLSeo = {
  org: SCL_ORG,
  getOrganizationSchema,
  getLoanSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  getArticleSchema,
  injectSchema,
};

// Auto-inject org schema on every page
document.addEventListener('DOMContentLoaded', () => {
  injectSchema(getOrganizationSchema());
});
