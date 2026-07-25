(() => {
  'use strict';

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- header shadow on scroll ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('shadow-lg', window.scrollY > 8);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Oferta dropdown (desktop) ---------- */
  const ofertaToggle = document.getElementById('oferta-toggle');
  const ofertaMenu = document.getElementById('oferta-menu');
  const ofertaChevron = document.getElementById('oferta-chevron');
  let ofertaOpen = false;

  const setOferta = (open) => {
    ofertaOpen = open;
    ofertaToggle.setAttribute('aria-expanded', String(open));
    ofertaChevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
    ofertaMenu.classList.toggle('opacity-0', !open);
    ofertaMenu.classList.toggle('invisible', !open);
    ofertaMenu.classList.toggle('translate-y-2', !open);
    ofertaMenu.classList.toggle('translate-y-0', open);
  };

  ofertaToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    setOferta(!ofertaOpen);
  });
  document.addEventListener('click', (e) => {
    if (ofertaOpen && !ofertaMenu.contains(e.target) && e.target !== ofertaToggle) setOferta(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ofertaOpen) setOferta(false);
  });

  /* ---------- Oferta dropdown (mobile, inline accordion) ---------- */
  const ofertaToggleM = document.getElementById('oferta-toggle-m');
  const ofertaMenuM = document.getElementById('oferta-menu-m');
  const ofertaChevronM = document.getElementById('oferta-chevron-m');
  ofertaToggleM?.addEventListener('click', () => {
    const isHidden = ofertaMenuM.classList.contains('hidden');
    ofertaMenuM.classList.toggle('hidden', !isHidden);
    ofertaMenuM.classList.toggle('flex', isHidden);
    ofertaToggleM.setAttribute('aria-expanded', String(isHidden));
    ofertaChevronM.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  /* ---------- search expand ---------- */
  const searchToggle = document.getElementById('search-toggle');
  const searchWrap = document.getElementById('search-wrap');
  const searchInput = document.getElementById('search-input');
  let searchOpen = false;

  const setSearch = (open) => {
    searchOpen = open;
    searchToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      searchWrap.style.width = '260px';
      searchWrap.classList.add('border-ink/15', 'bg-cream/60');
      searchInput.classList.remove('w-0');
      searchInput.classList.add('w-full', 'px-2');
      requestAnimationFrame(() => searchInput.focus());
    } else {
      searchWrap.style.width = '40px';
      searchWrap.classList.remove('border-ink/15', 'bg-cream/60');
      searchInput.classList.add('w-0');
      searchInput.classList.remove('w-full', 'px-2');
      searchInput.value = '';
    }
  };

  searchToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    setSearch(!searchOpen);
  });
  document.addEventListener('click', (e) => {
    if (searchOpen && !searchWrap.contains(e.target)) setSearch(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOpen) setSearch(false);
  });

  /* ---------- mobile menu ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  menuToggle?.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !isHidden);
    iconOpen.classList.toggle('hidden', isHidden);
    iconClose.classList.toggle('hidden', !isHidden);
    menuToggle.setAttribute('aria-expanded', String(isHidden));
  });

  /* ---------- hero carousel ---------- */
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const slides = Array.from(root.querySelectorAll('[data-slide]'));
    const prevBtn = root.querySelector('[data-prev]');
    const nextBtn = root.querySelector('[data-next]');
    let index = 0;
    let timer = null;

    const show = (i) => {
      slides.forEach((s, si) => s.classList.toggle('opacity-0', si !== i));
      index = i;
    };
    const step = (dir) => show((index + dir + slides.length) % slides.length);

    const autoplayMs = Number(root.dataset.autoplay) || 0;
    const start = () => {
      if (!autoplayMs) return;
      stop();
      timer = setInterval(() => step(1), autoplayMs);
    };
    const stop = () => timer && clearInterval(timer);

    nextBtn?.addEventListener('click', () => { step(1); start(); });
    prevBtn?.addEventListener('click', () => { step(-1); start(); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);

    show(0);
    start();
  });

  /* ---------- gallery: "Rozwiń" load more ---------- */
  const loadMoreBtn = document.getElementById('load-more');
  const galleryMore = document.getElementById('gallery-more');
  const galleryFade = document.getElementById('gallery-fade');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* gradient rozsypuje się jak piasek: canvas z ziarnami nad strefą fade'u */
  const sandBurst = () => {
    if (!galleryFade || reducedMotion.matches) return;
    const host = galleryFade.offsetParent || galleryFade.parentElement;
    const width = galleryFade.offsetWidth;
    const height = galleryFade.offsetHeight;
    if (!host || !width || !height) return;

    const fall = 140; // zapas pod spodem na spadające ziarna
    const canvas = document.createElement('canvas');
    canvas.className = 'pointer-events-none absolute z-10';
    canvas.style.left = galleryFade.offsetLeft + 'px';
    canvas.style.top = galleryFade.offsetTop + 'px';
    canvas.style.width = width + 'px';
    canvas.style.height = height + fall + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round((height + fall) * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    host.appendChild(canvas);

    const colors = ['#DCC1AB', '#D3B69C', '#E6D0BC', '#C8A98B'];
    const count = Math.min(1400, Math.round((width * height) / 650));
    const grains = Array.from({ length: count }, () => {
      const depth = Math.sqrt(Math.random()); // gęściej przy dole, jak gradient
      return {
        x: Math.random() * width,
        y: depth * height,
        vx: (Math.random() - 0.5) * 70,
        vy: 20 + Math.random() * 80,
        r: 1.2 + Math.random() * 2.6,
        color: colors[(Math.random() * colors.length) | 0],
        alpha: 0.35 + depth * 0.65,
        life: 0.9 + Math.random() * 0.7,
        age: 0,
      };
    });

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height + fall);
      let alive = 0;
      grains.forEach((g) => {
        g.age += dt;
        if (g.age >= g.life) return;
        alive++;
        g.vy += 320 * dt; // grawitacja
        g.x += g.vx * dt;
        g.y += g.vy * dt;
        ctx.globalAlpha = g.alpha * (1 - g.age / g.life);
        ctx.fillStyle = g.color;
        ctx.fillRect(g.x, g.y, g.r, g.r);
      });
      if (alive) requestAnimationFrame(tick);
      else canvas.remove();
    };
    requestAnimationFrame(tick);
  };

  loadMoreBtn?.addEventListener('click', () => {
    const willShow = galleryMore.classList.contains('hidden');
    if (willShow) {
      sandBurst();
      galleryMore.classList.remove('hidden');
      galleryMore.classList.add('grid');
      galleryMore.removeAttribute('aria-hidden');
      galleryMore.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), 250 + i * 90);
      });
      galleryFade?.classList.add('opacity-0');
      loadMoreBtn.querySelector('[data-label]').textContent = 'Zwiń';
      loadMoreBtn.querySelector('[data-icon]').style.transform = 'rotate(180deg)';
      loadMoreBtn.setAttribute('aria-expanded', 'true');
    } else {
      galleryMore.classList.add('hidden');
      galleryMore.classList.remove('grid');
      galleryMore.setAttribute('aria-hidden', 'true');
      galleryFade?.classList.remove('opacity-0');
      loadMoreBtn.querySelector('[data-label]').textContent = 'Rozwiń';
      loadMoreBtn.querySelector('[data-icon]').style.transform = 'rotate(0deg)';
      loadMoreBtn.setAttribute('aria-expanded', 'false');
      galleryMore.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  /* ---------- lightbox gallery ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let galleryItems = [];
  let currentIndex = 0;
  let lastFocused = null;

  const refreshGalleryItems = () => {
    galleryItems = Array.from(document.querySelectorAll('[data-lightbox]')).filter(
      (btn) => btn.offsetParent !== null || !btn.closest('[aria-hidden="true"]')
    );
  };

  const openLightbox = (index) => {
    refreshGalleryItems();
    currentIndex = index;
    lastFocused = document.activeElement;
    updateLightboxImage();
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    requestAnimationFrame(() => {
      lightbox.classList.remove('opacity-0');
      lightboxImg.classList.remove('opacity-0', 'scale-95');
    });
    document.body.classList.add('overflow-hidden');
    lightboxClose.focus();
  };

  const updateLightboxImage = () => {
    const btn = galleryItems[currentIndex];
    if (!btn) return;
    const full = btn.dataset.full;
    const img = btn.querySelector('img');
    lightboxImg.src = full || img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
  };

  const closeLightbox = () => {
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.add('opacity-0', 'scale-95');
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    }, 300);
    lastFocused?.focus();
  };

  const stepLightbox = (dir) => {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    lightboxImg.classList.add('opacity-0');
    setTimeout(() => {
      updateLightboxImage();
      lightboxImg.classList.remove('opacity-0');
    }, 150);
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lightbox]');
    if (!btn) return;
    refreshGalleryItems();
    openLightbox(galleryItems.indexOf(btn));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', () => stepLightbox(1));
  lightboxPrev?.addEventListener('click', () => stepLightbox(-1));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') stepLightbox(1);
    if (e.key === 'ArrowLeft') stepLightbox(-1);
  });
})();
