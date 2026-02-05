// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

class Carousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.prevButton = this.carousel.querySelector('.carousel-btn-prev');
        this.nextButton = this.carousel.querySelector('.carousel-btn-next');
        this.dotsContainer = this.carousel.querySelector('.carousel-dots');

        this.currentIndex = 0;
        this.autoplayInterval = null;

        this.init();
    }

    init() {
        // Create dots
        this.createDots();

        // Add event listeners
        this.prevButton.addEventListener('click', () => this.showPrevSlide());
        this.nextButton.addEventListener('click', () => this.showNextSlide());

        // Auto-play
        this.startAutoplay();

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());

        // Touch support for mobile
        this.addTouchSupport();
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = Array.from(this.dotsContainer.children);
    }

    showSlide(index) {
        // Update current index
        this.currentIndex = index;

        // Move track
        const slideWidth = this.slides[0].getBoundingClientRect().width;
        this.track.style.transform = `translateX(-${slideWidth * index}px)`;

        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    showNextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    showPrevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.showNextSlide(), 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.showNextSlide();
            }
            if (touchEndX > touchStartX + 50) {
                this.showPrevSlide();
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

function initForms() {
    // Tour form
    const tourForm = document.querySelector('.cta-card:first-child .cta-form');
    if (tourForm) {
        tourForm.addEventListener('submit', handleTourSubmit);
    }

    // Donation form
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }
}

function handleTourSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        age: formData.get('age')
    };

    // Here you would normally send data to a server
    console.log('Tour request:', data);

    // Show success message
    alert(`Спасибо, ${data.name}! Мы свяжемся с вами в ближайшее время.`);

    // Reset form
    e.target.reset();
}

function handleDonationSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedAmount = formData.get('amount');
    const customAmount = formData.get('custom-amount');
    const recurring = formData.get('recurring');

    const amount = customAmount || selectedAmount;

    const data = {
        amount: amount,
        recurring: recurring === 'on'
    };

    // Here you would normally integrate with payment system (ЮMoney, etc.)
    console.log('Donation:', data);

    // Show success message
    const recurringText = data.recurring ? 'ежемесячное пожертвование' : 'пожертвование';
    alert(`Спасибо за ваше ${recurringText} в размере ${amount} рублей!`);

    // In production, redirect to payment gateway
    // window.location.href = '/payment?amount=' + amount + '&recurring=' + data.recurring;
}

// ============================================
// SCROLL ANIMATIONS (каскадное появление)
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    // Карточки с каскадной задержкой (stagger)
    const cardGroups = [
        '.program-card',
        '.parent-card',
        '.testimonial-card',
        '.status-item',
        '.benefit-item',
        '.cta-card'
    ];

    cardGroups.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.transitionDelay = `${index * 0.08}s`;
            observer.observe(el);
        });
    });

    // Крупные блоки (без задержки)
    const blocks = document.querySelectorAll(
        '.about-mission, .about-founders, .about-download, ' +
        '.concerts-content, .programs-note, .carousel-wrapper'
    );
    blocks.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ============================================
// PARALLAX (лёгкий эффект для hero)
// ============================================

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 768) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight * 1.2) {
                    hero.style.backgroundPositionY = `${scrolled * 0.35}px`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// DONATION AMOUNT SELECTION
// ============================================

function initDonationAmounts() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.querySelector('input[name="custom-amount"]');

    if (!amountButtons.length || !customAmountInput) return;

    // Clear radio selection when custom amount is entered
    customAmountInput.addEventListener('input', () => {
        amountButtons.forEach(btn => {
            const radio = btn.querySelector('input[type="radio"]');
            if (radio) radio.checked = false;
        });
    });

    // Clear custom amount when radio is selected
    amountButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            customAmountInput.value = '';
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

function initHeaderScroll() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow to header when scrolled
        if (currentScroll > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        new Carousel(carouselElement);
    }

    // Initialize other features
    initSmoothScroll();
    initForms();
    initScrollAnimations();
    initParallax();
    initDonationAmounts();
    initHeaderScroll();

    console.log('Зерно Веры — сайт загружен успешно!');
});

// ============================================
// UTILITY: Phone number formatting
// ============================================

function formatPhoneNumber(input) {
    // Remove all non-digits
    let value = input.value.replace(/\D/g, '');

    // Format as +7 (XXX) XXX-XX-XX
    if (value.length > 0) {
        if (value[0] === '8') value = '7' + value.slice(1);
        if (value[0] !== '7') value = '7' + value;
    }

    let formatted = '+7';
    if (value.length > 1) {
        formatted += ' (' + value.slice(1, 4);
    }
    if (value.length >= 5) {
        formatted += ') ' + value.slice(4, 7);
    }
    if (value.length >= 8) {
        formatted += '-' + value.slice(7, 9);
    }
    if (value.length >= 10) {
        formatted += '-' + value.slice(9, 11);
    }

    input.value = formatted;
}

// Apply phone formatting
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});
