/* JavaScript Document

Tooplate 2166 Ivory Flow
    
https://www.tooplate.com/view/2166-ivory-flow

*/

(function() {
  'use strict';

  var openLightbox;

  function buildWhatsAppLink(pieceName) {
    return 'https://wa.me/33768728002?text=' + encodeURIComponent('Bonjour, je suis intéressée par : ' + pieceName);
  }

  /* ── Timeline items — fade in at center viewport ── */
  var timelineItems = document.querySelectorAll('[data-timeline]');

  if ('IntersectionObserver' in window) {
    var timelineObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { rootMargin: '-30% 0px -30% 0px' });

    timelineItems.forEach(function(el) { timelineObs.observe(el); });

    setTimeout(function() {
      timelineItems.forEach(function(el) { el.classList.add('in-view'); });
    }, 3000);
  } else {
    timelineItems.forEach(function(el) { el.classList.add('in-view'); });
  }

  /* ── Active pill nav link ── */
  var pillLinks = document.querySelectorAll('.pill-nav a');
  var sections = document.querySelectorAll('.canvas-section');

  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          pillLinks.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(function(sec) {
      if (sec.id) navObs.observe(sec);
    });
  }

  /* ── Est. label: swap to muted color over the dark process section ── */
  var estLabel = document.querySelector('.est-label');
  var processSection = document.getElementById('process');

  if (estLabel && processSection && 'IntersectionObserver' in window) {
    var estLabelObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        estLabel.classList.toggle('est-label--on-dark', entry.isIntersecting);
      });
    }, { threshold: 0.2 });

    estLabelObs.observe(processSection);
  }

  /* ── Mouse-following Buy Circle (LERP) ── */
  var buyCircle = document.getElementById('buyCircle');
  var productZone = document.getElementById('productImageZone');
  var mouseX = 0, mouseY = 0, circleX = 0, circleY = 0;
  var isOverProduct = false;
  var rafId = null;
  var hasHoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (productZone) {
    productZone.addEventListener('click', function() {
      window.open(buildWhatsAppLink(productSlides[currentSlide].plainName), '_blank', 'noopener');
    });
  }

  if (productZone && buyCircle && hasHoverPointer) {
    productZone.addEventListener('mouseenter', function() {
      isOverProduct = true;
      buyCircle.classList.add('visible');
      if (!rafId) lerpLoop();
    });

    productZone.addEventListener('mouseleave', function() {
      isOverProduct = false;
      buyCircle.classList.remove('visible');
    });

    productZone.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      var overThumbs = !!e.target.closest('.product-thumbs');
      buyCircle.classList.toggle('visible', !overThumbs);
    });

    function lerpLoop() {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      buyCircle.style.left = circleX - 60 + 'px';
      buyCircle.style.top = circleY - 60 + 'px';

      if (isOverProduct || Math.abs(mouseX - circleX) > 0.5) {
        rafId = requestAnimationFrame(lerpLoop);
      } else {
        rafId = null;
      }
    }
  }

  /* ── Product: 3-piece carousel ── */
  var productSlides = [
    {
      images: ['images/noeud-automne-1.jpg', 'images/noeud-automne-2.jpg'],
      alts: [
        'Nœud papillon Automne, pièce signature KEL Design',
        'Nœud papillon Automne, vue rapprochée sur les éclats dorés et fleurs séchées'
      ],
      badge: 'Pièce Signature',
      name: 'Le Nœud Papillon<br>Automne',
      plainName: 'Le Nœud Papillon Automne',
      price: 'Sur devis',
      desc: "Composé de fleurs séchées prises dans la résine et rehaussé d'éclats dorés. Fixation en suédine, façonné à la main dans mon atelier.",
      specs: ['Résine &amp; fleurs séchées', 'Suédine', 'Pièce sur commande', 'Fabrication française']
    },
    {
      images: ['images/boucles-herbier-jaune-velours.jpg'],
      alts: ["Boucles d'oreilles herbier jaune sur fond bleu nuit"],
      badge: 'Pièce Signature',
      name: "Boucles d'Oreilles<br>Herbier Jaune Velours",
      plainName: "Boucles d'Oreilles Herbier Jaune Velours",
      price: '16€', // prix provisoire, à confirmer
      desc: "Un assemblage de fleurs séchées jaunes prises dans la résine, à la forme organique et aux éclats dorés. Façonnées à la main dans mon atelier.",
      specs: ['Résine &amp; fleurs séchées', 'Crochets dorés', 'Pièce sur commande', 'Fabrication française']
    },
    {
      images: ['images/boucles-transparente-cuivre-bordeaux.jpg'],
      alts: ["Boucles d'oreilles transparentes à éclats cuivrés et perle bordeaux"],
      badge: 'Pièce Signature',
      name: "Boucles d'Oreilles<br>Transparente Cuivre &amp; Bordeaux",
      plainName: "Boucles d'Oreilles Transparente Cuivre & Bordeaux",
      price: '17€', // prix provisoire, à confirmer
      desc: "Une composition transparente à éclats cuivrés, prolongée d'une perle bordeaux. Résine façonnée à la main dans mon atelier.",
      specs: ['Résine &amp; fleurs séchées', 'Crochets dorés', 'Pièce sur commande', 'Fabrication française']
    }
  ];

  var productSection = document.querySelector('.product');
  var productPrevBtn = document.getElementById('productPrev');
  var productNextBtn = document.getElementById('productNext');
  var productDots = document.querySelectorAll('.product-dot');

  if (productSection && productPrevBtn && productNextBtn && productDots.length) {
    var currentSlide = 0;
    var isTransitioning = false;
    var infoContent = productSection.querySelector('.product-info-content');
    var slideImg = productSection.querySelector('.product-main-img');
    var thumbsEl = document.getElementById('productThumbs');
    var badgeEl = productSection.querySelector('.product-badge');
    var nameEl = productSection.querySelector('.product-name');
    var priceEl = productSection.querySelector('.product-price');
    var descEl = productSection.querySelector('.product-desc');
    var specDds = productSection.querySelectorAll('.product-spec dd');
    var productCta = productSection.querySelector('#productCta');

    function renderThumbs(data) {
      thumbsEl.innerHTML = '';
      if (data.images.length <= 1) {
        thumbsEl.classList.remove('is-visible');
        return;
      }
      thumbsEl.classList.add('is-visible');
      data.images.forEach(function(src, i) {
        var thumb = document.createElement('button');
        thumb.className = 'product-thumb' + (i === 0 ? ' is-active' : '');
        thumb.style.backgroundImage = 'url(' + src + ')';
        thumb.setAttribute('aria-label', 'Voir cette photo');
        thumb.addEventListener('click', function(e) {
          e.stopPropagation();
          slideImg.src = src;
          slideImg.alt = data.alts[i];
          thumbsEl.querySelectorAll('.product-thumb').forEach(function(t) { t.classList.remove('is-active'); });
          thumb.classList.add('is-active');
        });
        thumbsEl.appendChild(thumb);
      });
    }

    function renderSlide(index) {
      var data = productSlides[index];
      slideImg.src = data.images[0];
      slideImg.alt = data.alts[0];
      renderThumbs(data);
      badgeEl.textContent = data.badge;
      nameEl.innerHTML = data.name;
      priceEl.textContent = data.price;
      descEl.textContent = data.desc;
      specDds.forEach(function(dd, i) { dd.innerHTML = data.specs[i]; });
      productCta.href = buildWhatsAppLink(data.plainName);
      productDots.forEach(function(dot, i) {
        var active = i === index;
        dot.classList.toggle('is-active', active);
        if (active) { dot.setAttribute('aria-current', 'true'); }
        else { dot.removeAttribute('aria-current'); }
      });
    }

    function goToSlide(index) {
      if (isTransitioning || index === currentSlide) return;
      isTransitioning = true;
      currentSlide = index;

      var done = false;
      function finish() {
        if (done) return;
        done = true;
        renderSlide(currentSlide);
        productSection.classList.remove('is-fading');
        isTransitioning = false;
      }

      infoContent.addEventListener('transitionend', finish, { once: true });
      setTimeout(finish, 500);
      productSection.classList.add('is-fading');
    }

    productPrevBtn.addEventListener('click', function() {
      goToSlide((currentSlide + productSlides.length - 1) % productSlides.length);
    });

    productNextBtn.addEventListener('click', function() {
      goToSlide((currentSlide + 1) % productSlides.length);
    });

    productDots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(dot.getAttribute('data-slide'), 10));
      });
    });

    renderThumbs(productSlides[currentSlide]);
    productCta.href = buildWhatsAppLink(productSlides[currentSlide].plainName);
  }

  /* ── Lookbook: Momentum drag + Arrow buttons ── */
  var track = document.querySelector('.lookbook-track');
  if (track) {
    var isDragging = false;
    var startX = 0;
    var scrollStart = 0;
    var velX = 0;
    var lastX = 0;
    var lastTime = 0;
    var momentumId = null;
    var dragDistance = 0;

    track.addEventListener('mousedown', function(e) {
      cancelMomentum();
      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      scrollStart = track.scrollLeft;
      lastTime = Date.now();
      velX = 0;
      dragDistance = 0;
      track.classList.add('is-dragging');
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
      var now = Date.now();
      var dt = now - lastTime;
      var dx = e.clientX - lastX;
      if (dt > 0) velX = dx / dt;
      lastX = e.clientX;
      lastTime = now;
      dragDistance = Math.abs(e.clientX - startX);
      track.scrollLeft = scrollStart - (e.clientX - startX);
    });

    document.addEventListener('mouseup', function() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      startMomentum();
    });

    function startMomentum() {
      if (Math.abs(velX) < 0.1) return;
      var speed = -velX * 18;
      function step() {
        speed *= 0.94;
        if (Math.abs(speed) < 0.5) return;
        track.scrollLeft += speed;
        momentumId = requestAnimationFrame(step);
      }
      momentumId = requestAnimationFrame(step);
    }

    function cancelMomentum() {
      if (momentumId) {
        cancelAnimationFrame(momentumId);
        momentumId = null;
      }
    }

    /* Arrow buttons */
    var prevBtn = document.getElementById('lbPrev');
    var nextBtn = document.getElementById('lbNext');
    var cards = track.querySelectorAll('.lookbook-card');

    function getScrollStep() {
      return cards.length ? cards[0].offsetWidth + 28 : 400;
    }

    function smoothScroll(target) {
      cancelMomentum();
      var start = track.scrollLeft;
      var dist = target - start;
      var duration = 600;
      var startTime = null;

      function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function animate(now) {
        if (!startTime) startTime = now;
        var elapsed = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        track.scrollLeft = start + dist * ease(progress);
        if (progress < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }

    if (prevBtn) prevBtn.addEventListener('click', function() {
      smoothScroll(track.scrollLeft - getScrollStep());
    });

    if (nextBtn) nextBtn.addEventListener('click', function() {
      smoothScroll(track.scrollLeft + getScrollStep());
    });

    /* Click/tap to zoom (skipped when the click ends a drag) */
    cards.forEach(function(card) {
      var img = card.querySelector('img');
      if (img) {
        img.addEventListener('click', function() {
          if (dragDistance > 5 || !openLightbox) return;
          openLightbox(img.src, img.alt);
        });
      }

      var cta = card.querySelector('.lookbook-card-cta');
      if (cta) {
        cta.href = buildWhatsAppLink(card.getAttribute('data-piece-name'));
        cta.addEventListener('click', function(e) {
          if (dragDistance > 5) e.preventDefault();
        });
      }
    });
  }

  /* ── Lookbook: Lightbox zoom ── */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('.lightbox-img');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    openLightbox = function(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    };

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* ── Hamburger ── */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileLinks = document.querySelectorAll('.mobile-nav a');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Smooth scroll for pill nav ── */
  pillLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();