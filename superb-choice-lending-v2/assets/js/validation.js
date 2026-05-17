/* =========================================================
   SCL — US-Standard Form Validation
   Phone, EIN, SSN, ZIP, States, Currency, Email, URL, DOB
   ========================================================= */

const SCLValidation = (function() {

  // ─── US States ───────────────────────────────────────────
  const US_STATES = [
    ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],
    ['CA','California'],['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],
    ['DC','District of Columbia'],['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],
    ['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],
    ['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],
    ['MD','Maryland'],['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],
    ['MS','Mississippi'],['MO','Missouri'],['MT','Montana'],['NE','Nebraska'],
    ['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],['NM','New Mexico'],
    ['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],
    ['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],
    ['SC','South Carolina'],['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],
    ['UT','Utah'],['VT','Vermont'],['VA','Virginia'],['WA','Washington'],
    ['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming']
  ];

  function getStateOptions() {
    return US_STATES.map(([code, name]) =>
      `<option value="${code}">${name}</option>`
    ).join('');
  }

  // ─── Patterns ────────────────────────────────────────────
  const PATTERNS = {
    email:       /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    phone:       /^\(?[2-9]\d{2}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}$/,
    ein:         /^\d{2}-?\d{7}$/,
    ssn:         /^\d{3}-?\d{2}-?\d{4}$/,
    zip:         /^\d{5}(-\d{4})?$/,
    url:         /^https?:\/\/[\w\-]+(\.[\w\-]+)+([\/?#].*)?$/i,
    naics:       /^\d{2,6}$/,
    state:       /^[A-Z]{2}$/,
    currency:    /^\$?[\d,]+(\.\d{1,2})?$/,
  };

  // ─── Formatters ─────────────────────────────────────────
  const formatters = {
    phone: v => {
      const d = v.replace(/\D/g,'').slice(0,10);
      if (d.length === 0) return '';
      if (d.length < 4) return '(' + d;
      if (d.length < 7) return '(' + d.slice(0,3) + ') ' + d.slice(3);
      return '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6);
    },
    ein: v => {
      const d = v.replace(/\D/g,'').slice(0,9);
      if (d.length < 3) return d;
      return d.slice(0,2) + '-' + d.slice(2);
    },
    ssn: v => {
      const d = v.replace(/\D/g,'').slice(0,9);
      if (d.length < 4) return d;
      if (d.length < 6) return d.slice(0,3) + '-' + d.slice(3);
      return d.slice(0,3) + '-' + d.slice(3,5) + '-' + d.slice(5);
    },
    zip: v => {
      const d = v.replace(/\D/g,'').slice(0,9);
      if (d.length <= 5) return d;
      return d.slice(0,5) + '-' + d.slice(5);
    },
    currency: v => {
      const d = v.replace(/[^\d.]/g,'');
      if (!d) return '';
      const parts = d.split('.');
      const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const decPart = parts[1] !== undefined ? '.' + parts[1].slice(0,2) : '';
      return intPart + decPart;
    },
    currencyNumber: v => {
      const n = parseFloat(v.replace(/[^\d.]/g,''));
      return isNaN(n) ? 0 : n;
    },
  };

  // ─── Validators (return error message or null) ─────────
  const validators = {
    required: v => (v && v.toString().trim()) ? null : 'This field is required.',
    email: v => !v ? null : (PATTERNS.email.test(v) ? null : 'Enter a valid email address.'),
    phone: v => !v ? null : (PATTERNS.phone.test(v) ? null : 'Enter a valid US phone, e.g. (555) 123-4567.'),
    ein: v => !v ? null : (PATTERNS.ein.test(v) ? null : 'Enter a valid 9-digit EIN, e.g. 12-3456789.'),
    ssn: v => !v ? null : (PATTERNS.ssn.test(v) ? null : 'Enter a valid 9-digit SSN.'),
    zip: v => !v ? null : (PATTERNS.zip.test(v) ? null : 'Enter a valid 5 or 9-digit ZIP code.'),
    url: v => !v ? null : (PATTERNS.url.test(v) ? null : 'Enter a valid URL starting with https://'),
    state: v => !v ? null : (PATTERNS.state.test(v) ? null : 'Select a valid US state.'),
    naics: v => !v ? null : (PATTERNS.naics.test(v) ? null : 'NAICS codes are 2-6 digits.'),
    currency: v => !v ? null : (PATTERNS.currency.test(v) ? null : 'Enter a valid amount.'),
    min: (min) => v => {
      const n = formatters.currencyNumber(v);
      return n >= min ? null : `Must be at least ${min.toLocaleString()}.`;
    },
    max: (max) => v => {
      const n = formatters.currencyNumber(v);
      return n <= max ? null : `Must be no more than ${max.toLocaleString()}.`;
    },
    range: (min, max) => v => {
      const n = parseFloat(v);
      if (isNaN(n)) return null;
      if (n < min) return `Must be at least ${min}.`;
      if (n > max) return `Must be no more than ${max}.`;
      return null;
    },
    age18: v => {
      if (!v) return null;
      const dob = new Date(v);
      if (isNaN(dob)) return 'Enter a valid date.';
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 18) return 'Applicant must be 18 or older.';
      if (age > 120) return 'Enter a valid date of birth.';
      return null;
    },
    pastDate: v => {
      if (!v) return null;
      const d = new Date(v);
      if (isNaN(d)) return 'Enter a valid date.';
      return d <= new Date() ? null : 'Date must be in the past.';
    },
    futureOrToday: v => {
      if (!v) return null;
      const d = new Date(v);
      const today = new Date();
      today.setHours(0,0,0,0);
      return d >= today ? null : 'Date must be today or in the future.';
    },
    pattern: (regex, msg) => v => !v || regex.test(v) ? null : msg,
  };

  // ─── Auto-attach formatters to inputs ───────────────────
  function attachFormatter(input, type) {
    if (!formatters[type]) return;
    input.addEventListener('input', e => {
      const start = e.target.selectionStart;
      const oldLen = e.target.value.length;
      e.target.value = formatters[type](e.target.value);
      const newLen = e.target.value.length;
      // Re-position cursor sensibly
      try {
        e.target.setSelectionRange(start + (newLen - oldLen), start + (newLen - oldLen));
      } catch (err) {}
    });
  }

  // ─── Field validation pipeline ──────────────────────────
  function validateField(input) {
    const wrap = input.closest('.field');
    if (!wrap) return true;

    const value = input.type === 'checkbox' ? input.checked : input.value.trim();
    const rules = (input.dataset.rules || '').split('|').filter(Boolean);
    const isRequired = input.required || rules.includes('required');

    // Empty + not required = valid
    if (!value && !isRequired) {
      wrap.classList.remove('invalid');
      return true;
    }

    // Check required
    if (isRequired && !value) {
      showFieldError(wrap, 'This field is required.');
      return false;
    }

    // Run each rule
    for (const rule of rules) {
      if (rule === 'required') continue;

      // Parse rule (e.g. "min:1000", "range:0:100")
      const [name, ...args] = rule.split(':');
      const validator = validators[name];
      if (!validator) continue;

      const fn = args.length ? validator(...args.map(a => isNaN(a) ? a : Number(a))) : validator;
      const err = typeof fn === 'function' ? fn(value) : fn;
      if (err) {
        showFieldError(wrap, err);
        return false;
      }
    }

    wrap.classList.remove('invalid');
    return true;
  }

  function showFieldError(wrap, msg) {
    wrap.classList.add('invalid');
    let errEl = wrap.querySelector('.field-error');
    if (errEl) errEl.textContent = msg;
  }

  // ─── Form-wide ──────────────────────────────────────────
  function validateForm(formOrScope) {
    const inputs = formOrScope.querySelectorAll('input, select, textarea');
    let valid = true;
    let firstInvalid = null;
    inputs.forEach(input => {
      if (input.type === 'hidden') return;
      if (!validateField(input)) {
        valid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });
    return { valid, firstInvalid };
  }

  // ─── Auto-wire (call on page load) ──────────────────────
  function autoWire(scope = document) {
    scope.querySelectorAll('[data-format]').forEach(input => {
      attachFormatter(input, input.dataset.format);
    });

    scope.querySelectorAll('input, select, textarea').forEach(input => {
      // On blur — validate
      input.addEventListener('blur', () => validateField(input));
      // On input — clear error if user is fixing
      input.addEventListener('input', () => {
        const wrap = input.closest('.field');
        if (wrap && wrap.classList.contains('invalid')) {
          wrap.classList.remove('invalid');
        }
      });
    });

    // Populate state dropdowns
    scope.querySelectorAll('[data-states]').forEach(sel => {
      const def = sel.querySelector('option[value=""]')?.outerHTML || '<option value="" disabled selected hidden></option>';
      sel.innerHTML = def + getStateOptions();
    });
  }

  return {
    autoWire,
    validateField,
    validateForm,
    formatters,
    validators,
    patterns: PATTERNS,
    states: US_STATES,
    stateOptions: getStateOptions,
  };
})();

// Make globally available
window.SCLValidation = SCLValidation;
