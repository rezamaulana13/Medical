/**
* Template Name: MediCare
* Template URL: https://bootstrapmade.com/medicare-bootstrap-template/
* Updated: Apr 28 2026 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Lazy-load background slide hero (selain slide pertama)
   */
  window.addEventListener('load', function() {
    document.querySelectorAll('[data-bg]').forEach(function(el) {
      el.style.backgroundImage = "url('" + el.getAttribute('data-bg') + "')";
    });
  });

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active') && !navmenu.classList.contains('toggle-dropdown')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', aosInit); } else { aosInit(); }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  /**
   * Init 3D Coverflow Gallery Slider
   */
  function initGalleryCoverflow() {
    const coverflowEl = document.querySelector('.gallery-coverflow-slider');
    if (!coverflowEl || typeof Swiper === 'undefined') return;

    const coverflowSwiper = new Swiper(coverflowEl, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      speed: 600,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      coverflowEffect: {
        rotate: 22,
        stretch: 0,
        depth: 160,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        nextEl: '.gallery-swiper-next',
        prevEl: '.gallery-swiper-prev',
      },
      pagination: {
        el: '.gallery-swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: {
          coverflowEffect: {
            rotate: 15,
            depth: 80,
          }
        },
        768: {
          coverflowEffect: {
            rotate: 20,
            depth: 130,
          }
        },
        1024: {
          coverflowEffect: {
            rotate: 22,
            depth: 160,
          }
        }
      },
      on: {
        init: function() {
          setTimeout(initGlightbox, 100);
        }
      }
    });

    setTimeout(initGlightbox, 200);
  }

  /**
   * Initiate glightbox
   */
  let glightboxInstance = null;
  function initGlightbox() {
    if (typeof GLightbox === 'undefined') return;
    try {
      if (glightboxInstance) {
        glightboxInstance.destroy();
      }
      glightboxInstance = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true
      });
    } catch (e) {
      console.warn('GLightbox init error:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlightbox);
  } else {
    initGlightbox();
  }

  window.addEventListener("load", function() {
    initSwiper();
    initGalleryCoverflow();
    setTimeout(initGlightbox, 250);
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    const container = isotopeItem.querySelector('.isotope-container');
    if (!container) return;

    const isDoctorDirectory = isotopeItem.closest('.doctor-directory') || isotopeItem.closest('#doctors') || document.querySelector('#doctor-search');

    imagesLoaded(container, function() {
      initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      if (isDoctorDirectory) {
        setupDoctorFilter(isotopeItem, initIsotope);
      }
    });

    if (!isDoctorDirectory) {
      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (activeFilter) activeFilter.classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    }

  });

  /**
   * Interactive Doctor Directory Filtering Functionality
   */
  
  /**
   * Custom Dropdown Select for Clean UI & Mobile Compatibility
   */
  function initCustomSelects() {
    const selects = document.querySelectorAll('.doctor-directory select.sh-input, .find-a-doctor select');
    selects.forEach(function(select) {
      if (select.closest('.custom-select-wrap')) return;

      // Wrap select
      const wrap = document.createElement('div');
      wrap.className = 'custom-select-wrap';
      select.parentNode.insertBefore(wrap, select);
      wrap.appendChild(select);
      select.classList.add('visually-hidden-select');

      // Create Custom Trigger
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-select-trigger';
      const selectedOption = select.options[select.selectedIndex] || select.options[0];
      const initialText = selectedOption ? selectedOption.textContent : 'Pilih...';
      trigger.innerHTML = '<span class="trigger-label">' + initialText + '</span><i class="bi bi-chevron-down"></i>';
      wrap.appendChild(trigger);

      // Create Custom Options Menu
      const menu = document.createElement('div');
      menu.className = 'custom-select-menu';

      Array.from(select.options).forEach(function(opt, idx) {
        const item = document.createElement('div');
        item.className = 'custom-select-option' + (idx === select.selectedIndex ? ' is-selected' : '');
        item.setAttribute('data-value', opt.value);
        item.innerHTML = '<span>' + opt.textContent + '</span><i class="bi bi-check2"></i>';

        item.addEventListener('click', function(e) {
          e.stopPropagation();
          select.value = opt.value;
          trigger.querySelector('.trigger-label').textContent = opt.textContent;
          menu.querySelectorAll('.custom-select-option').forEach(function(el) { el.classList.remove('is-selected'); });
          item.classList.add('is-selected');
          wrap.classList.remove('is-open');

          // Trigger change event on native select
          const evt = new Event('change', { bubbles: true });
          select.dispatchEvent(evt);
        });

        menu.appendChild(item);
      });

      wrap.appendChild(menu);

      // Toggle dropdown
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = wrap.classList.contains('is-open');
        document.querySelectorAll('.custom-select-wrap.is-open').forEach(function(el) { el.classList.remove('is-open'); });
        if (!isOpen) {
          wrap.classList.add('is-open');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.custom-select-wrap')) {
        document.querySelectorAll('.custom-select-wrap.is-open').forEach(function(el) { el.classList.remove('is-open'); });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initCustomSelects);
  window.addEventListener('load', initCustomSelects);

  function setupDoctorFilter(isotopeItem, initIsotope) {
    initCustomSelects();
    function syncCustomSelect(selectEl) {
      if (!selectEl) return;
      const wrap = selectEl.closest('.custom-select-wrap');
      if (!wrap) return;
      const selectedOpt = selectEl.options[selectEl.selectedIndex];
      if (selectedOpt) {
        const triggerLabel = wrap.querySelector('.trigger-label');
        if (triggerLabel) triggerLabel.textContent = selectedOpt.textContent;
        wrap.querySelectorAll('.custom-select-option').forEach(function(el) {
          if (el.getAttribute('data-value') === selectEl.value) {
            el.classList.add('is-selected');
          } else {
            el.classList.remove('is-selected');
          }
        });
      }
    }

    const searchInput = document.querySelector('#doctor-search');
    const departmentSelect = document.querySelector('#doctor-department-filter');
    const locationSelect = document.querySelector('#doctor-location-filter');
    const filterBtn = document.querySelector('#doctor-filter-btn');
    const noResults = document.querySelector('#doctor-no-results');
    const resetBtn = document.querySelector('#doctor-filter-reset');
    const filterPills = isotopeItem.querySelectorAll('.isotope-filters li');

    let currentDept = '*';
    let currentLocation = '*';
    let currentQuery = '';

    function applyFilters() {
      currentQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
      currentDept = departmentSelect ? departmentSelect.value : '*';
      currentLocation = locationSelect ? locationSelect.value.toLowerCase() : '*';

      initIsotope.arrange({
        filter: function(itemElem) {
          // 1. Department check
          let matchDept = true;
          if (currentDept && currentDept !== '*') {
            matchDept = itemElem.matches(currentDept);
          }

          // 2. Location check
          let matchLocation = true;
          if (currentLocation && currentLocation !== '*') {
            const itemLoc = (itemElem.getAttribute('data-location') || '').toLowerCase();
            const textLoc = (itemElem.querySelector('.meta-item') ? itemElem.querySelector('.meta-item').textContent : '').toLowerCase();
            matchLocation = itemLoc.includes(currentLocation) || textLoc.includes(currentLocation);
          }

          // 3. Search query check
          let matchSearch = true;
          if (currentQuery) {
            const cardText = itemElem.textContent.toLowerCase();
            matchSearch = cardText.includes(currentQuery);
          }

          return matchDept && matchLocation && matchSearch;
        }
      });

      // Show/Hide empty state feedback
      setTimeout(function() {
        if (noResults) {
          if (initIsotope.filteredItems.length === 0) {
            noResults.classList.remove('d-none');
          } else {
            noResults.classList.add('d-none');
          }
        }
      }, 100);

      if (typeof aosInit === 'function') {
        aosInit();
      }
    }

    // Sync pill click -> update department select & apply filter
    filterPills.forEach(function(pill) {
      pill.addEventListener('click', function(e) {
        e.preventDefault();
        const activePill = isotopeItem.querySelector('.isotope-filters .filter-active');
        if (activePill) activePill.classList.remove('filter-active');
        this.classList.add('filter-active');

        const filterVal = this.getAttribute('data-filter');
        if (departmentSelect) {
          departmentSelect.value = filterVal;
          syncCustomSelect(departmentSelect);
        }
        applyFilters();
      });
    });

    // Sync department dropdown -> update active pill & apply filter
    if (departmentSelect) {
      departmentSelect.addEventListener('change', function() {
        const selectedVal = this.value;
        filterPills.forEach(function(pill) {
          if (pill.getAttribute('data-filter') === selectedVal) {
            const activePill = isotopeItem.querySelector('.isotope-filters .filter-active');
            if (activePill) activePill.classList.remove('filter-active');
            pill.classList.add('filter-active');
          }
        });
        applyFilters();
      });
    }

    // Location dropdown change
    if (locationSelect) {
      locationSelect.addEventListener('change', applyFilters);
    }

    // Live search input with debounce
    if (searchInput) {
      let debounceTimeout;
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(applyFilters, 200);
      });

      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          clearTimeout(debounceTimeout);
          applyFilters();
        }
      });
    }

    // Filter button click
    if (filterBtn) {
      filterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        applyFilters();
      });
    }

    // Reset button click
    if (resetBtn) {
      resetBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (searchInput) searchInput.value = '';
        if (departmentSelect) { departmentSelect.value = '*'; syncCustomSelect(departmentSelect); }
        if (locationSelect) { locationSelect.value = '*'; syncCustomSelect(locationSelect); }

        filterPills.forEach(function(pill) {
          if (pill.getAttribute('data-filter') === '*') {
            const activePill = isotopeItem.querySelector('.isotope-filters .filter-active');
            if (activePill) activePill.classList.remove('filter-active');
            pill.classList.add('filter-active');
          }
        });

        applyFilters();
      });
    }
  }

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });


  /**
   * Interactive Collapsible Table of Contents
   */
  function initArticleToc() {
    const tocBoxes = document.querySelectorAll('.toc-box');
    tocBoxes.forEach(function(toc) {
      const header = toc.querySelector('.toc-header');
      const toggleBtn = toc.querySelector('.toc-toggle-btn');
      const toggleLabel = toc.querySelector('.toc-toggle-label');

      if (!header) return;

      function toggleToc() {
        const isCollapsed = toc.classList.toggle('is-collapsed');
        if (toggleLabel) {
          toggleLabel.textContent = isCollapsed ? 'Tampilkan' : 'Sembunyikan';
        }
        header.setAttribute('aria-expanded', !isCollapsed);
      }

      header.addEventListener('click', function(e) {
        e.preventDefault();
        toggleToc();
      });

      header.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleToc();
        }
      });
    });

    // Smooth scroll for TOC links with fixed header offset
    document.querySelectorAll('.toc-list a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerEl = document.querySelector('#header');
          const headerHeight = headerEl ? headerEl.offsetHeight : 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initArticleToc);
  window.addEventListener('load', initArticleToc);


  /**
   * Interactive Table of Contents (Bootstrap 5 Collapse + Smooth Anchor)
   */
  function setupArticleToc() {
    // Smooth scroll for TOC links
    document.querySelectorAll('.toc-list a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerEl = document.querySelector('#header');
          const headerHeight = headerEl ? headerEl.offsetHeight : 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', setupArticleToc);
  window.addEventListener('load', setupArticleToc);

})();