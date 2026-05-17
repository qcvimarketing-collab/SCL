/* =========================================================
   SCL — Shared Utilities (every page)
   ========================================================= */

const SCL = {

  // Toast notification
  toast(msg, opts = {}) {
    let el = document.getElementById('scl-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'scl-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A85C" stroke-width="2">
        ${opts.error
          ? '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>'
          : '<path d="M20 6L9 17l-5-5"/>'}
      </svg>
      <span>${msg}</span>`;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), opts.duration || 2600);
  },

  // Initialize sticky header shadow
  initHeader() {
    const h = document.querySelector('.site-header');
    if (!h) return;
    const onScroll = () => h.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  // Mobile nav drawer
  initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.mobile-nav');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    if (!toggle || !nav || !backdrop) return;

    const open = () => {
      nav.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      nav.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', open);
    backdrop.addEventListener('click', close);
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  },

  // Reveal-on-scroll
  initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  },

  // Smooth scroll to anchor (with header offset)
  scrollTo(selector, offset = 90) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  },

  // Format date for display
  formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  },

  // Auto-init common stuff
  init() {
    this.initHeader();
    this.initMobileNav();
    this.initReveal();
    if (window.SCLValidation) window.SCLValidation.autoWire();
  }
};

if (document.readyState !== 'loading') SCL.init();
else document.addEventListener('DOMContentLoaded', () => SCL.init());

window.SCL = SCL;
