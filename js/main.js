/**
 * WANDERLY TRAVEL & TOURISM - MAIN JAVASCRIPT
 * Stack: Pure Vanilla JavaScript (ES6+)
 * Handlers: Mobile Menu, Smooth Navigation, Booking Modal, Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navPlanTripBtn = document.getElementById('navPlanTripBtn');

  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const bookingForm = document.getElementById('bookingForm');
  const destinationSelect = document.getElementById('travelDestination');
  const openBookingBtns = document.querySelectorAll('.open-booking');
  const toastNotification = document.getElementById('toastNotification');

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const toggleMobileMenu = () => {
    const isActive = navMenu.classList.toggle('is-active');
    mobileToggle.classList.toggle('is-active');
    document.body.classList.toggle('menu-open', isActive);
    mobileToggle.setAttribute('aria-expanded', String(isActive));
  };

  const closeMobileMenu = () => {
    if (navMenu.classList.contains('is-active')) {
      navMenu.classList.remove('is-active');
      mobileToggle.classList.remove('is-active');
      document.body.classList.remove('menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile drawer when clicking any link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3. STICKY HEADER & SCROLL SPY
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ScrollSpy Active Link Updates
  const sections = document.querySelectorAll('section[id], footer[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 4. BOOKING / TRIP PLAN MODAL
  // --------------------------------------------------------------------------
  const openModal = (destinationName = '') => {
    if (destinationSelect && destinationName) {
      let matchFound = false;
      for (let i = 0; i < destinationSelect.options.length; i++) {
        if (destinationSelect.options[i].value.toLowerCase() === destinationName.toLowerCase()) {
          destinationSelect.selectedIndex = i;
          matchFound = true;
          break;
        }
      }
      if (!matchFound) {
        destinationSelect.value = 'Custom Itinerary';
      }
    }
    bookingModal.classList.add('is-active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    bookingModal.classList.remove('is-active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (navPlanTripBtn) {
    navPlanTripBtn.addEventListener('click', () => {
      openModal();
    });
  }

  openBookingBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dest = btn.getAttribute('data-destination') || '';
      openModal(dest);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 5. BOOKING FORM SUBMISSION & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const showToast = () => {
    if (!toastNotification) return;
    toastNotification.classList.add('is-visible');
    setTimeout(() => {
      toastNotification.classList.remove('is-visible');
    }, 4500);
  };

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic simulation of form submission
      closeModal();
      bookingForm.reset();
      showToast();
    });
  }
});
