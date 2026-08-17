/**
 * WANDERLY TRAVEL & TOURISM - MAIN JAVASCRIPT
 * Stack: Pure Vanilla JavaScript (ES6+)
 * Handlers: Mobile Navigation Drawer, Sticky Header, ScrollSpy,
 *           Smart Contextual Modal (Spotlight + Trip Planner), Toast Alerts.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DATA REPOSITORY: DESTINATIONS SPOTLIGHT DATA
  // --------------------------------------------------------------------------
  const destinationsData = {
    bali: {
      name: 'Bali, Indonesia',
      region: 'Southeast Asia',
      rating: '⭐ 4.9 (1.4k+ verified reviews)',
      image: 'assets/images/destinations/bali.jpg',
      season: 'April – October (Dry Season)',
      duration: '5 – 7 Days',
      currency: 'IDR (Indonesian Rupiah)',
      price: 'From ₹65,999 / person',
      description: 'Immerse yourself in lush emerald rice terraces, sacred ancient cliffside temples, world-class surfing beaches, and tranquil wellness retreats.',
      highlights: [
        'Ubud Sacred Monkey Forest & Tegalalang Rice Terraces',
        'Uluwatu Sunset Temple & Kecak Fire Dance Ceremony',
        'Mount Batur Sunrise Trekking & Natural Hot Springs',
        'Speedboat Day Excursion to Nusa Penida Crystal Bay'
      ],
      selectValue: 'Bali, Indonesia'
    },
    dubai: {
      name: 'Dubai, UAE',
      region: 'United Arab Emirates',
      rating: '⭐ 4.8 (2.1k+ verified reviews)',
      image: 'assets/images/destinations/dubai.jpg',
      season: 'November – March (Pleasant)',
      duration: '4 – 6 Days',
      currency: 'AED (Emirati Dirham)',
      price: 'From ₹89,999 / person',
      description: 'Experience iconic futuristic architecture, world-class luxury shopping, and golden desert safaris where traditional Arabian heritage meets modern luxury.',
      highlights: [
        'Burj Khalifa 124th Floor Skydeck & Dubai Fountain Show',
        '4x4 VIP Desert Safari, Dune Bashing & Bedouin Sunset BBQ',
        'Luxury Dubai Marina Yacht Cruise with Five-Star Buffet',
        'Historic Al Fahidi District, Gold & Spice Souk Walking Tour'
      ],
      selectValue: 'Dubai, UAE'
    },
    maldives: {
      name: 'Maldives',
      region: 'Indian Ocean',
      rating: '⭐ 5.0 (950+ verified reviews)',
      image: 'assets/images/destinations/maldives.jpg',
      season: 'December – April (Calm Waters)',
      duration: '5 – 8 Days',
      currency: 'USD / MVR (Rufiyaa)',
      price: 'From ₹1,55,999 / person',
      description: 'Relax in crystal clear turquoise waters, pristine overwater villas, and vibrant coral reef sanctuaries in an intimate tropical paradise.',
      highlights: [
        'Private Overwater Villa Stay with Direct Lagoon Access',
        'Guided Coral Reef Snorkeling with Sea Turtles & Manta Rays',
        'Sunset Dolphin Watching Cruise & Private Sandbank Picnic',
        'Traditional Maldivian Aromatherapy Spa Experience'
      ],
      selectValue: 'Maldives'
    },
    switzerland: {
      name: 'Switzerland',
      region: 'Central Europe',
      rating: '⭐ 4.9 (1.8k+ verified reviews)',
      image: 'assets/images/destinations/switzerland.jpg',
      season: 'June – Sept (Summer) / Dec – Mar (Ski)',
      duration: '6 – 8 Days',
      currency: 'CHF (Swiss Franc)',
      price: 'From ₹1,24,999 / person',
      description: 'Discover majestic snowcapped Alpine peaks, mirror-like glacial lakes, scenic mountain railways, and charming traditional Swiss chalets.',
      highlights: [
        'Panoramic Glacier Express Train across the Swiss Alps',
        'Zermatt & Iconic Matterhorn Mountain Viewpoint',
        'Lake Lucerne Steamship Cruise & Mount Pilatus Cableway',
        'Lauterbrunnen Valley of 72 Waterfalls & Alpine Village Tour'
      ],
      selectValue: 'Switzerland'
    }
  };

  // --------------------------------------------------------------------------
  // 2. DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navPlanTripBtn = document.getElementById('navPlanTripBtn');

  // Modal Elements
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const tabBtnSpotlight = document.getElementById('tabBtnSpotlight');
  const tabBtnPlanner = document.getElementById('tabBtnPlanner');
  const modalTabSpotlight = document.getElementById('modalTabSpotlight');
  const modalTabPlanner = document.getElementById('modalTabPlanner');

  // Spotlight View Elements
  const spotlightHeroImg = document.getElementById('spotlightHeroImg');
  const spotlightRegion = document.getElementById('spotlightRegion');
  const spotlightTitle = document.getElementById('spotlightTitle');
  const spotlightRating = document.getElementById('spotlightRating');
  const spotlightDesc = document.getElementById('spotlightDesc');
  const spotlightSeason = document.getElementById('spotlightSeason');
  const spotlightDuration = document.getElementById('spotlightDuration');
  const spotlightCurrency = document.getElementById('spotlightCurrency');
  const spotlightPrice = document.getElementById('spotlightPrice');
  const spotlightHighlights = document.getElementById('spotlightHighlights');
  const spotlightBookBtn = document.getElementById('spotlightBookBtn');

  // Form Elements
  const bookingForm = document.getElementById('bookingForm');
  const destinationSelect = document.getElementById('travelDestination');
  const travelDepartureDate = document.getElementById('travelDepartureDate');
  const travelReturnDate = document.getElementById('travelReturnDate');
  const openSpotlightBtns = document.querySelectorAll('.open-spotlight');
  const openPlannerBtns = document.querySelectorAll('.open-planner');
  const toastNotification = document.getElementById('toastNotification');

  // Set minimum date constraints for Departure & Return Dates
  const today = new Date().toISOString().split('T')[0];
  if (travelDepartureDate) {
    travelDepartureDate.min = today;
    travelDepartureDate.addEventListener('change', () => {
      if (travelReturnDate) {
        travelReturnDate.min = travelDepartureDate.value || today;
        if (travelReturnDate.value && travelReturnDate.value < travelDepartureDate.value) {
          travelReturnDate.value = travelDepartureDate.value;
        }
      }
    });
  }

  if (travelReturnDate) {
    travelReturnDate.min = today;
  }

  // --------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const toggleMobileMenu = () => {
    const isActive = navMenu.classList.toggle('is-active');
    mobileToggle.classList.toggle('is-active');
    document.body.classList.toggle('menu-open', isActive);
    mobileToggle.setAttribute('aria-expanded', String(isActive));
  };

  const closeMobileMenu = () => {
    if (navMenu && navMenu.classList.contains('is-active')) {
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

  // Close mobile drawer when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close when clicking outside header / drawer
  document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3.1 PRECISE HEADER-AWARE SMOOTH SCROLLING
  // --------------------------------------------------------------------------
  const internalNavLinks = document.querySelectorAll('a[href^="#"]');

  internalNavLinks.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetHref = anchor.getAttribute('href');
      if (!targetHref || targetHref === '#') return;

      if (targetHref === '#home') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        closeMobileMenu();
        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, '#home');
        }
        return;
      }

      const targetSection = document.querySelector(targetHref);
      if (targetSection) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 76;
        const targetRect = targetSection.getBoundingClientRect();
        // Align section top boundary directly below sticky header without bleeding prior section
        const scrollPosition = targetRect.top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: Math.max(0, Math.round(scrollPosition)),
          behavior: 'smooth'
        });

        closeMobileMenu();
        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, targetHref);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. STICKY HEADER & SCROLL SPY
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
  // 5. SMART CONTEXTUAL MODAL (SPOTLIGHT & TRIP PLANNER)
  // --------------------------------------------------------------------------
  
  // Switch between Spotlight Overview and Trip Planner Tabs
  const switchModalTab = (tabName) => {
    if (tabName === 'spotlight') {
      if (tabBtnSpotlight) {
        tabBtnSpotlight.classList.add('active');
        tabBtnSpotlight.setAttribute('aria-selected', 'true');
      }
      if (tabBtnPlanner) {
        tabBtnPlanner.classList.remove('active');
        tabBtnPlanner.setAttribute('aria-selected', 'false');
      }
      if (modalTabSpotlight) modalTabSpotlight.classList.add('active');
      if (modalTabPlanner) modalTabPlanner.classList.remove('active');
    } else if (tabName === 'planner') {
      if (tabBtnPlanner) {
        tabBtnPlanner.classList.add('active');
        tabBtnPlanner.setAttribute('aria-selected', 'true');
      }
      if (tabBtnSpotlight) {
        tabBtnSpotlight.classList.remove('active');
        tabBtnSpotlight.setAttribute('aria-selected', 'false');
      }
      if (modalTabPlanner) modalTabPlanner.classList.add('active');
      if (modalTabSpotlight) modalTabSpotlight.classList.remove('active');
    }
  };

  // Populate Destination Spotlight data dynamically
  const populateSpotlight = (destKey) => {
    const dest = destinationsData[destKey] || destinationsData.bali;
    if (!dest) return;

    if (spotlightHeroImg) {
      spotlightHeroImg.src = dest.image;
      spotlightHeroImg.alt = dest.name;
    }
    if (spotlightRegion) spotlightRegion.textContent = dest.region;
    if (spotlightTitle) spotlightTitle.textContent = dest.name;
    if (spotlightRating) spotlightRating.textContent = dest.rating;
    if (spotlightDesc) spotlightDesc.textContent = dest.description;
    if (spotlightSeason) spotlightSeason.textContent = dest.season;
    if (spotlightDuration) spotlightDuration.textContent = dest.duration;
    if (spotlightCurrency) spotlightCurrency.textContent = dest.currency;
    if (spotlightPrice) spotlightPrice.textContent = dest.price;

    // Render Highlights List
    if (spotlightHighlights && Array.isArray(dest.highlights)) {
      spotlightHighlights.innerHTML = dest.highlights.map((item) => `
        <li>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${item}</span>
        </li>
      `).join('');
    }

    // Sync destination select dropdown
    syncDestinationDropdown(dest.selectValue || dest.name);
  };

  // Helper to select dropdown item cleanly
  const syncDestinationDropdown = (destinationVal) => {
    if (!destinationSelect || !destinationVal) return;
    let matchFound = false;
    for (let i = 0; i < destinationSelect.options.length; i++) {
      if (destinationSelect.options[i].value.toLowerCase() === destinationVal.toLowerCase()) {
        destinationSelect.selectedIndex = i;
        matchFound = true;
        break;
      }
    }
    if (!matchFound) {
      destinationSelect.value = 'Custom Itinerary';
    }
  };

  // Open Modal in Spotlight Mode
  const openSpotlightModal = (destKey) => {
    populateSpotlight(destKey);
    switchModalTab('spotlight');
    showModal();
  };

  // Open Modal in Direct Trip Planner Mode
  const openPlannerModal = (destOrPackageVal = '') => {
    if (destOrPackageVal) {
      syncDestinationDropdown(destOrPackageVal);
    }
    switchModalTab('planner');
    showModal();
  };

  const showModal = () => {
    if (!bookingModal) return;
    
    // Prevent layout shift from scrollbar disappearing (desktop only)
    if (window.innerWidth > 768) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (header) header.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    
    document.body.classList.add('modal-open');
    bookingModal.classList.add('is-active');
    bookingModal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('is-active');
    bookingModal.setAttribute('aria-hidden', 'true');
    
    // Restore layout after animation completes
    setTimeout(() => {
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
      if (header) header.style.paddingRight = '';
    }, 280);
  };

  // Tab button click listeners
  if (tabBtnSpotlight) {
    tabBtnSpotlight.addEventListener('click', () => switchModalTab('spotlight'));
  }
  if (tabBtnPlanner) {
    tabBtnPlanner.addEventListener('click', () => switchModalTab('planner'));
  }
  if (spotlightBookBtn) {
    spotlightBookBtn.addEventListener('click', () => switchModalTab('planner'));
  }

  // Trigger modal from Destination Cards ("Explore Details")
  openSpotlightBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-destination-key') || 'bali';
      openSpotlightModal(key);
    });
  });

  // Trigger modal from Package Cards & "Plan Your Trip" CTAs
  openPlannerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-destination-val') || '';
      openPlannerModal(val);
    });
  });

  if (navPlanTripBtn) {
    navPlanTripBtn.addEventListener('click', () => openPlannerModal());
  }

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
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 6. FORM SUBMISSION & ANIMATED TOAST NOTIFICATION
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
      closeModal();
      bookingForm.reset();
      if (travelDepartureDate) travelDepartureDate.min = today;
      if (travelReturnDate) travelReturnDate.min = today;
      showToast();
    });
  }
});
