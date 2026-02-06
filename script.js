// ============================================
// ЗЕРНО ВЕРЫ — скрипт сайта
// Карусель, sticky header, счётчики, анимации
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initStickyHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initImpactCounters();
  initStickyBottomBar();
  initDonationForm();
});

// ============================================
// КАРУСЕЛЬ — автопрокрутка + кнопки + dots
// ============================================

function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!track || !slides.length) return;

  let current = 0;
  let interval;
  const total = slides.length;

  // Создаём точки навигации
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goToSlide(index) {
    current = ((index % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function prevSlide() {
    goToSlide(current - 1);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  // Свайп на мобильных
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

// ============================================
// STICKY HEADER
// Появляется при скролле вниз после hero
// ============================================

function initStickyHeader() {
  const header = document.getElementById('site-header');
  const hero = document.getElementById('hero');
  if (!header || !hero) return;

  const heroHeight = hero.offsetHeight;
  let lastScroll = 0;
  let headerVisible = false;

  function onScroll() {
    const scrollY = window.scrollY;

    // Показываем header после прокрутки hero
    if (scrollY > heroHeight * 0.6) {
      if (!headerVisible) {
        header.classList.add('visible');
        headerVisible = true;
      }
    } else {
      if (headerVisible) {
        header.classList.remove('visible');
        headerVisible = false;
      }
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ============================================
// МОБИЛЬНОЕ МЕНЮ (бургер)
// ============================================

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // Закрытие при клике на ссылку
  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('site-header')
          ? document.getElementById('site-header').offsetHeight
          : 0;
        const isHeaderVisible = document.getElementById('site-header')
          && document.getElementById('site-header').classList.contains('visible');
        const offset = isHeaderVisible ? headerHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// SCROLL ANIMATIONS
// Плавное появление секций при скролле
// ============================================

function initScrollAnimations() {
  const sections = document.querySelectorAll('.animate-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  sections.forEach(function(section) {
    observer.observe(section);
  });
}

// ============================================
// IMPACT COUNTERS
// Анимация счётчиков при попадании в viewport
// ============================================

function initImpactCounters() {
  const counters = document.querySelectorAll('.impact-number');
  if (!counters.length) return;

  let animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;

    counters.forEach(function(counter) {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2000; // 2 секунды
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart для плавного замедления
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.round(target * eased);
        counter.textContent = value.toLocaleString('ru-RU');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const impactSection = document.querySelector('.impact');
  if (!impactSection) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(impactSection);
}

// ============================================
// STICKY BOTTOM BAR (мобильные)
// Появляется после прокрутки hero, скрывается у CTA
// ============================================

function initStickyBottomBar() {
  const bar = document.getElementById('stickyBottom');
  const hero = document.getElementById('hero');
  const cta = document.getElementById('cta');
  if (!bar || !hero) return;

  function onScroll() {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetHeight;
    const ctaTop = cta ? cta.offsetTop - window.innerHeight : Infinity;

    // Показываем после hero, скрываем когда видна CTA-секция
    if (scrollY > heroBottom && scrollY < ctaTop) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ============================================
// ФОРМА ПОЖЕРТВОВАНИЯ
// Валидация чекбоксов согласия (ФЗ-152)
// ============================================

function initDonationForm() {
  const form = document.querySelector('.donation-form');
  if (!form) return;

  const ofertaCheckbox = form.querySelector('input[name="agree-oferta"]');
  const privacyCheckbox = form.querySelector('input[name="agree-privacy"]');
  const errorMsg = document.getElementById('donationError');

  // Скрываем ошибку при изменении чекбоксов
  [ofertaCheckbox, privacyCheckbox].forEach(function(cb) {
    if (cb) {
      cb.addEventListener('change', function() {
        if (ofertaCheckbox.checked && privacyCheckbox.checked) {
          errorMsg.style.display = 'none';
        }
      });
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Проверяем обязательные чекбоксы
    if (!ofertaCheckbox || !privacyCheckbox ||
        !ofertaCheckbox.checked || !privacyCheckbox.checked) {
      errorMsg.style.display = 'block';
      return;
    }

    errorMsg.style.display = 'none';

    // Определяем сумму пожертвования
    var selectedAmount = form.querySelector('input[name="amount"]:checked');
    var customAmount = form.querySelector('input[name="custom-amount"]');
    var amount = 0;

    if (customAmount && customAmount.value) {
      amount = parseInt(customAmount.value, 10);
    } else if (selectedAmount) {
      amount = parseInt(selectedAmount.value, 10);
    }

    if (!amount || amount < 1) {
      alert('Пожалуйста, выберите или введите сумму пожертвования');
      return;
    }

    var isRecurring = form.querySelector('input[name="recurring"]').checked;

    // TODO: Здесь будет интеграция с платёжным агрегатором
    // (CloudPayments / ЮKassa / Mixplat)
    // Пока показываем информационное сообщение
    alert(
      'Спасибо за желание поддержать центр!\n\n' +
      'Сумма: ' + amount + ' руб.' +
      (isRecurring ? ' (ежемесячно)' : ' (разово)') +
      '\n\nОнлайн-оплата будет подключена в ближайшее время. ' +
      'Пока вы можете перевести средства по QR-коду (СБП) ' +
      'или по реквизитам в нижней части страницы.'
    );
  });
}
