
(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const serviceCards = Array.from(document.querySelectorAll('[data-service-card]'));
  const leadForm = document.getElementById('leadForm');
  const statusEls = Array.from(document.querySelectorAll('#openStatus, #openStatus2'));
  const yearEl = document.getElementById('year');
  const whatsappNumber = '966542473441';

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', document.body.classList.contains('nav-open'));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      serviceCards.forEach((card) => {
        const match = filter === 'الكل' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => io.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('in-view'));
  }

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const allNavAnchors = Array.from(document.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          allNavAnchors.forEach((anchor) => {
            anchor.classList.toggle('active', anchor.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => activeObserver.observe(section));
  }

  function getRiyadhParts() {
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Riyadh', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
    const parts = formatter.formatToParts(new Date());
    const value = (type) => parts.find((p) => p.type === type)?.value;
    return { weekday: value('weekday'), hour: Number(value('hour')), minute: Number(value('minute')) };
  }

  function updateOpenStatus() {
    if (!statusEls.length) return;
    const { weekday, hour, minute } = getRiyadhParts();
    const total = hour * 60 + minute;
    const friday = weekday === 'Fri';
    const open = friday ? 14 * 60 : 9 * 60;
    const close = 22 * 60;
    const isOpen = total >= open && total < close;
    statusEls.forEach((el) => {
      el.textContent = isOpen ? 'مفتوح الآن حسب توقيت الرياض' : 'مغلق الآن — تواصل عبر واتساب وسنرد في أوقات العمل';
      el.classList.toggle('closed', !isOpen);
    });
  }
  updateOpenStatus();

  function encodeMessage(text) { return encodeURIComponent(text).replace(/'/g, '%27'); }

  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(leadForm);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const service = String(data.get('service') || '').trim();
      const message = String(data.get('message') || '').trim();
      if (!name || !phone || !service) {
        alert('فضلاً اكتب الاسم ورقم الجوال واختر الخدمة المطلوبة.');
        return;
      }
      const text = `السلام عليكم، أنا ${name}. أرغب في طلب خدمة: ${service} من مؤسسة العنود للديكور الخشبي. رقم التواصل: ${phone}. التفاصيل: ${message || 'سأرسل التفاصيل والصور عبر واتساب.'}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeMessage(text)}`, '_blank', 'noopener');
    });
  }
}());
