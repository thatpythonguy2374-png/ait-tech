// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Hero slider
  const slides = document.querySelectorAll('.hero .slide');
  const dots = document.querySelectorAll('.hero-dots button');
  if (slides.length > 0) {
    let i = 0;
    const show = (n) => {
      slides.forEach((s, k) => s.classList.toggle('active', k === n));
      dots.forEach((d, k) => d.classList.toggle('active', k === n));
      i = n;
    };
    document.querySelector('.hero-arrow.prev')?.addEventListener('click', () => show((i - 1 + slides.length) % slides.length));
    document.querySelector('.hero-arrow.next')?.addEventListener('click', () => show((i + 1) % slides.length));
    dots.forEach((d, k) => d.addEventListener('click', () => show(k)));
    setInterval(() => show((i + 1) % slides.length), 5000);
  }

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) return showToast('Please fill in all required fields.', true);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('Please enter a valid email.', true);
      showToast("Message sent! We'll get back to you within 24 hours.");
      form.reset();
    });
  }
});

function showToast(msg, isError) {
  const t = document.createElement('div');
  t.className = 'toast' + (isError ? ' error' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}
