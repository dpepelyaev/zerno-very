// ============================================
// ЗЕРНО ВЕРЫ — скрипт сайта
// Слайдер, навигация, плавная прокрутка
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initMobileMenu();
    initSmoothScroll();
    console.log('Зерно Веры — сайт загружен');
});

// ============================================
// СЛАЙДЕР — автопрокрутка + кнопки
// ============================================

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slides.length) return;
    
    let current = 0;
    let interval;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
    }

    function nextSlide() {
        showSlide(current + 1);
    }

    function prevSlide() {
        showSlide(current - 1);
    }

    function startAutoplay() {
        interval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(interval);
        startAutoplay();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    startAutoplay();
}

// ============================================
// МОБИЛЬНОЕ МЕНЮ
// ============================================

function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        menu.classList.toggle('open');
    });

    // Закрытие при клике на ссылку
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });
}

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}
