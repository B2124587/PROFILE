/* ============================================================
   BEYAR BILONDA — PORTFOLIO · app.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Pages & Nav ──────────────────────────────────────────
  const pages       = document.querySelectorAll('.page');
  const chapterBtns = document.querySelectorAll('.chapter-btn');
  const progressBar = document.getElementById('progressBar');

  // Intersection Observer → reveal pages + update nav
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        updateNav(entry.target.id);
        animateSkillsIfNeeded(entry.target);
      }
    });
  }, { threshold: 0.25 });

  pages.forEach(p => observer.observe(p));

  // ── Scroll Progress ───────────────────────────────────────
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.body.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.height = pct + '%';
  });

  // ── Navigation active state ───────────────────────────────
  function updateNav(activeId) {
    chapterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === activeId);
    });
  }

  chapterBtns.forEach(btn => {
    btn.addEventListener('click', () => scrollToPage(btn.dataset.target));
  });

  // ── Skill Bar Animation ───────────────────────────────────
  const animatedSections = new Set();

  function animateSkillsIfNeeded(section) {
    if (section.id !== 'skills') return;
    if (animatedSections.has('skills')) return;
    animatedSections.add('skills');

    const items = section.querySelectorAll('.skill-item');
    items.forEach((item, i) => {
      const fill  = item.querySelector('.skill-fill');
      const level = item.dataset.level;
      setTimeout(() => {
        fill.style.width = level + '%';
      }, i * 120);
    });
  }

  // ── Cover Page entrance animation ────────────────────────
  setTimeout(() => {
    const cover = document.getElementById('cover');
    if (cover) cover.classList.add('visible');
  }, 100);

});

// ── Scroll helper (global, used by inline onclick) ──────────
function scrollToPage(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ── Contact form ────────────────────────────────────────────
function handleFormSubmit() {
  const name    = document.getElementById('formName').value.trim();
  const email   = document.getElementById('formEmail').value.trim();
  const message = document.getElementById('formMsg').value.trim();
  const success = document.getElementById('formSuccess');

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  // Simulate submission
  const btn = document.querySelector('.btn-full');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    success.style.display = 'block';
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    document.getElementById('formName').value  = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formMsg').value   = '';
  }, 900);
}
