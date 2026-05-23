// ===== IntersectionObserver: Fade-in sections on scroll =====
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section-hidden');
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ===== Navbar scroll effect =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== Active nav link highlighting =====
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionElements = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sectionElements.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  };
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // ===== Mobile hamburger menu =====
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== Coursework toggle =====
  const courseworkBtn = document.querySelector('.coursework-btn');
  const courseworkList = document.querySelector('.coursework-list');

  if (courseworkBtn && courseworkList) {
    courseworkBtn.addEventListener('click', () => {
      courseworkBtn.classList.toggle('open');
      courseworkList.classList.toggle('open');
    });
  }

  // ===== Staggered animation for cards =====
  const animateCards = (selector) => {
    const cards = document.querySelectorAll(selector);
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      cardObserver.observe(card);
    });
  };

  animateCards('.skill-card');
  animateCards('.project-card');
  animateCards('.achievement-card');
});
