/* =========================================================================
   SCIENCE DRIVEN PERFORMANCE — Premium Interactions JS
   ========================================================================= */

'use strict';

// =========================================================================
// 1. CURSOR GLOW
// =========================================================================
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  let raf;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animateCursor() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top  = currentY + 'px';
    raf = requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// =========================================================================
// 2. HEADER SCROLL BEHAVIOR
// =========================================================================
const siteHeader = document.getElementById('site-header');

function onScroll() {
  if (window.scrollY > 40) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run on load

// =========================================================================
// 3. HAMBURGER / MOBILE MENU
// =========================================================================
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-link-cta');

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// =========================================================================
// 4. HERO TRANSFORMATION PHOTO CAROUSEL
// =========================================================================
const photoSlides = document.querySelectorAll('.photo-slide');
const photoDots   = document.querySelectorAll('.dot');
const resultValue = document.getElementById('result-value');
const resultTag   = document.getElementById('result-tag');

const resultData = [
  '-18 lbs · 12 weeks',
  '-22 lbs · 16 weeks',
  '+15 lbs muscle · 20 weeks',
  '-30 lbs · 24 weeks',
  '-14 lbs · 10 weeks',
  '-16 lbs · 14 weeks',
  '-28 lbs · 18 weeks',
  '+12 lbs muscle · 22 weeks',
  '-25 lbs · 20 weeks',
];

let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  photoSlides[currentSlide].classList.remove('active');
  photoDots[currentSlide].classList.remove('active');

  currentSlide = (index + photoSlides.length) % photoSlides.length;

  photoSlides[currentSlide].classList.add('active');
  photoDots[currentSlide].classList.add('active');

  // Update result tag with a quick fade
  if (resultValue && resultTag) {
    resultTag.style.opacity = '0';
    resultTag.style.transform = 'translateY(4px)';
    setTimeout(() => {
      resultValue.textContent = resultData[currentSlide];
      resultTag.style.opacity = '1';
      resultTag.style.transform = 'translateY(0)';
    }, 250);
  }
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 4000);
}

function stopSlideshow() {
  clearInterval(slideInterval);
}

// Initialize result tag transition
if (resultTag) {
  resultTag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

photoDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    stopSlideshow();
    goToSlide(parseInt(e.currentTarget.dataset.dot));
    startSlideshow();
  });
});

const photoStack = document.getElementById('photo-stack');
if (photoStack) {
  photoStack.addEventListener('mouseenter', stopSlideshow);
  photoStack.addEventListener('mouseleave', startSlideshow);

  // Swipe support for mobile devices
  let swipeStartX = 0;
  let swipeEndX = 0;

  photoStack.addEventListener('touchstart', (e) => {
    swipeStartX = e.changedTouches[0].clientX;
    stopSlideshow();
  }, { passive: true });

  photoStack.addEventListener('touchend', (e) => {
    swipeEndX = e.changedTouches[0].clientX;
    const diffX = swipeEndX - swipeStartX;
    const threshold = 40; // minimum drag distance in pixels

    if (Math.abs(diffX) > threshold) {
      if (diffX < 0) {
        // Swiped left -> Next slide
        goToSlide(currentSlide + 1);
      } else {
        // Swiped right -> Previous slide
        goToSlide(currentSlide - 1);
      }
    }
    startSlideshow();
  }, { passive: true });
}

startSlideshow();

// =========================================================================
// 5. STAGGERED HERO REVEAL ON LOAD
// =========================================================================
function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// Hero elements revealed on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
});

// =========================================================================
// 6. GALLERY DRAG-TO-SCROLL
// =========================================================================
const galleryTrack = document.getElementById('gallery-track');
if (galleryTrack) {
  let isDown = false;
  let startX, scrollLeft;

  galleryTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    galleryTrack.classList.add('dragging');
    startX = e.pageX - galleryTrack.offsetLeft;
    scrollLeft = galleryTrack.scrollLeft;
  });

  galleryTrack.addEventListener('mouseleave', () => {
    isDown = false;
    galleryTrack.classList.remove('dragging');
  });

  galleryTrack.addEventListener('mouseup', () => {
    isDown = false;
    galleryTrack.classList.remove('dragging');
  });

  galleryTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    galleryTrack.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX = 0;
  let touchScrollLeft = 0;
  galleryTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = galleryTrack.scrollLeft;
  }, { passive: true });

  galleryTrack.addEventListener('touchmove', (e) => {
    const diff = touchStartX - e.touches[0].pageX;
    galleryTrack.scrollLeft = touchScrollLeft + diff;
  }, { passive: true });
}

// =========================================================================
// 7. FAQ ACCORDION
// =========================================================================
const faqTriggers = document.querySelectorAll('.faq-trigger');

faqTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const contentId = trigger.getAttribute('aria-controls');
    const content = document.getElementById(contentId);

    // Close all others
    faqTriggers.forEach(otherTrigger => {
      if (otherTrigger !== trigger) {
        otherTrigger.setAttribute('aria-expanded', 'false');
        const otherId = otherTrigger.getAttribute('aria-controls');
        const otherContent = document.getElementById(otherId);
        if (otherContent) otherContent.classList.remove('open');
      }
    });

    // Toggle current
    trigger.setAttribute('aria-expanded', String(!isExpanded));
    if (content) content.classList.toggle('open', !isExpanded);
  });
});

// =========================================================================
// 8. CONTACT FORM
// =========================================================================
const contactForm    = document.getElementById('contact-form');
const formSuccess    = document.getElementById('form-success');
const formSubmitBtn  = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput  = document.getElementById('c-name');
    const emailInput = document.getElementById('c-email');
    const goalInput  = document.getElementById('c-goal');

    // Simple validation
    if (!nameInput.value.trim()) {
      showToast('Please enter your name.', '⚠️');
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showToast('Please enter a valid email address.', '⚠️');
      emailInput.focus();
      return;
    }

    if (!goalInput.value) {
      showToast('Please select your primary goal.', '⚠️');
      goalInput.focus();
      return;
    }

    // Loading state
    formSubmitBtn.disabled = true;
    const originalHTML = formSubmitBtn.innerHTML;
    formSubmitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style="animation: spin 0.8s linear infinite" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
        <path d="M9 2a7 7 0 0 1 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      Submitting...
    `;

    // Simulate async (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1600));

    // Show success
    contactForm.hidden = true;
    formSuccess.hidden = false;
    showToast('Booking confirmed! Check your inbox.', '✓');

    // Reset button
    formSubmitBtn.disabled = false;
    formSubmitBtn.innerHTML = originalHTML;
  });
}

// =========================================================================
// 9. COUNT-UP ANIMATION (Stats section)
// =========================================================================
function animateCountUp(el) {
  const target  = parseFloat(el.dataset.count);
  const decimal = el.dataset.decimal ? parseFloat(el.dataset.decimal) : 0;
  const full    = target + decimal;
  const duration = 1800;
  const steps    = 60;
  const increment = full / steps;
  let current = 0;
  let count = 0;

  const timer = setInterval(() => {
    count++;
    current = Math.min(full, current + increment);

    if (decimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current);
    }

    if (count >= steps) {
      clearInterval(timer);
      el.textContent = decimal ? full.toFixed(1) : target;
    }
  }, duration / steps);
}

const statNums = document.querySelectorAll('[data-count]');
if (statNums.length > 0) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  statNums.forEach(el => statObserver.observe(el));
}

// =========================================================================
// 10. SECTION REVEAL OBSERVER (for non-hero elements)
// =========================================================================
const sectionRevealEls = document.querySelectorAll(
  '.pain-card, .testimonial-card, .process-step, .gallery-card, .faq-item, .about-credentials, .credential-item'
);

const sectionRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 60}ms`;
      entry.target.classList.add('visible');
      sectionRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.01, rootMargin: '0px 0px -10px 0px' });

sectionRevealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  sectionRevealObserver.observe(el);
});

// =========================================================================
// 11. TOAST HELPER
// =========================================================================
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message, icon = '') {
  if (!toast) return;
  toast.textContent = icon ? `${icon} ${message}` : message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// =========================================================================
// 12. SMOOTH SCROLLING FOR ANCHOR LINKS
// =========================================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    let targetSelector = link.getAttribute('href');
    
    // Redirect #results anchor links to #home on mobile and tablet viewports
    if (targetSelector === '#results' && window.innerWidth <= 1024) {
      targetSelector = '#home';
    }

    const target = document.querySelector(targetSelector);
    if (!target) return;
    e.preventDefault();
    const headerH = siteHeader ? siteHeader.offsetHeight : 80;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// =========================================================================
// 13. CSS SPINNER KEYFRAME INJECTION
// =========================================================================
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);

// =========================================================================
// 14. ACTIVE NAV LINK ON SCROLL (Intersection)
// =========================================================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], div[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -65% 0px' });

sections.forEach(section => navObserver.observe(section));

// Active nav link style
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `.nav-link.active { color: var(--c-text) !important; } .nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(navActiveStyle);
