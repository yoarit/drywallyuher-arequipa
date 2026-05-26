// YUHER - Script Principal

document.addEventListener('DOMContentLoaded', function () {

  // --- Custom cursor from landing ---
  const cur = document.getElementById('cursor');
  if (cur) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop(){ cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18; cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button,.btn-gold,.btn-outline-gold,.filter-btn,.service-card,.project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('big'));
      el.addEventListener('mouseleave', () => cur.classList.remove('big'));
    });
  }

  // ── Scroll reveal ──────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 0.08) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── Smooth scroll ──────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Navbar scroll effect ───────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ── Counter animation ──────────────────────────
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

});

// ── Project filter ─────────────────────────────
function filterProjects(category, ev) {
  const cards = document.querySelectorAll('.project-card-wrapper');
  const btns = document.querySelectorAll('.filter-btn');

  btns.forEach(btn => btn.classList.remove('active'));
  const target = ev && ev.target ? ev.target : (window.event && window.event.target);
  if (target) target.classList.add('active');

  cards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    if (match) {
      card.style.display = 'block';
      setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => { card.style.display = 'none'; }, 300);
    }
  });
}
