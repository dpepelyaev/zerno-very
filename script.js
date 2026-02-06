// ============================================
// ЗЕРНО ВЕРЫ — Основной скрипт
// Версия 2.0 — компактный сайт без карусели
// ============================================

// ============================================
// SMOOTH SCROLL — плавная прокрутка к якорям
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
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
// DONATION FORM — форма пожертвования
// ============================================

function initDonationForm() {
    const form = document.getElementById('donationForm');
    if (!form) return;

    const amountButtons = form.querySelectorAll('.amount-btn input[type="radio"]');
    const customAmountInput = form.querySelector('input[name="custom-amount"]');
    const ofertaCheckbox = form.querySelector('input[name="agree-oferta"]');
    const privacyCheckbox = form.querySelector('input[name="agree-privacy"]');
    const submitButton = form.querySelector('button[type="submit"]');

    // Сброс radio при вводе своей суммы
    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            amountButtons.forEach(radio => {
                radio.checked = false;
            });
        });
    }

    // Сброс своей суммы при выборе готовой
    amountButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            if (customAmountInput) {
                customAmountInput.value = '';
            }
        });
    });

    // Валидация и отправка формы
    form.addEventListener('submit', handleDonationSubmit);

    // Функция валидации
    function validateForm() {
        const errors = [];

        // Проверка суммы
        const selectedRadio = form.querySelector('input[name="amount"]:checked');
        const customValue = customAmountInput?.value.trim();
        
        if (!selectedRadio && !customValue) {
            errors.push('Выберите или введите сумму пожертвования');
        }

        if (customValue && (isNaN(customValue) || parseInt(customValue) < 1)) {
            errors.push('Введите корректную сумму (минимум 1 рубль)');
        }

        // Проверка согласий
        if (!ofertaCheckbox?.checked) {
            errors.push('Необходимо согласие с договором пожертвования');
        }

        if (!privacyCheckbox?.checked) {
            errors.push('Необходимо согласие на обработку персональных данных');
        }

        return errors;
    }

    // Подсветка ошибок в чекбоксах
    function highlightErrors(errors) {
        // Сброс предыдущих ошибок
        form.querySelectorAll('.checkbox-error').forEach(el => {
            el.classList.remove('checkbox-error');
        });

        if (errors.includes('Необходимо согласие с договором пожертвования')) {
            ofertaCheckbox?.closest('.checkbox-label')?.classList.add('checkbox-error');
        }

        if (errors.includes('Необходимо согласие на обработку персональных данных')) {
            privacyCheckbox?.closest('.checkbox-label')?.classList.add('checkbox-error');
        }
    }

    // Обработчик отправки
    function handleDonationSubmit(e) {
        e.preventDefault();

        const errors = validateForm();

        if (errors.length > 0) {
            highlightErrors(errors);
            showFormMessage(errors.join('\n'), 'error');
            return;
        }

        // Собираем данные
        const formData = new FormData(form);
        const selectedAmount = formData.get('amount');
        const customAmount = formData.get('custom-amount');
        const recurring = formData.get('recurring') === 'on';
        const amount = customAmount || selectedAmount;

        const data = {
            amount: parseInt(amount),
            recurring: recurring,
            timestamp: new Date().toISOString()
        };

        console.log('Пожертвование:', data);

        // Пока платёжная система не подключена — показываем сообщение
        const recurringText = recurring ? 'ежемесячное пожертвование' : 'единоразовое пожертвование';
        showFormMessage(
            `Спасибо за ваше ${recurringText} на сумму ${amount} ₽!\n\n` +
            `Онлайн-оплата пока в разработке.\n` +
            `Вы можете перевести средства по реквизитам выше.`,
            'success'
        );

        // В будущем здесь будет редирект на платёжную систему:
        // window.location.href = `https://payment.example.com/pay?amount=${amount}&recurring=${recurring}`;
    }
}

// ============================================
// FORM MESSAGES — уведомления формы
// ============================================

function showFormMessage(message, type = 'info') {
    // Удаляем предыдущее сообщение
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Создаём новое
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.innerHTML = `
        <span class="form-message-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="form-message-text">${message.replace(/\n/g, '<br>')}</span>
        <button class="form-message-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Вставляем после формы
    const form = document.getElementById('donationForm');
    if (form) {
        form.insertAdjacentElement('afterend', messageEl);
        
        // Прокрутка к сообщению
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Автоскрытие через 10 секунд
        setTimeout(() => {
            if (messageEl.parentElement) {
                messageEl.remove();
            }
        }, 10000);
    }
}

// ============================================
// SCROLL ANIMATIONS — анимации при прокрутке
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

    // Карточки направлений с каскадной задержкой
    const directionCards = document.querySelectorAll('.direction-card');
    directionCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Элементы статуса
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Крупные блоки
    const blocks = document.querySelectorAll(
        '.about-mission, .about-founders, .donate-requisites, .donate-form-wrapper'
    );
    blocks.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ============================================
// PARALLAX — лёгкий эффект для hero
// ============================================

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 768) return;

    // Отключаем parallax если prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
// HEADER SCROLL EFFECT — тень при скролле
// ============================================

function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset > 100;
        document.body.classList.toggle('scrolled', scrolled);
    }, { passive: true });
}

// ============================================
// PHONE NUMBER FORMATTING — форматирование телефона
// ============================================

function formatPhoneNumber(input) {
    // Убираем всё кроме цифр
    let value = input.value.replace(/\D/g, '');

    // Приводим к формату +7
    if (value.length > 0) {
        if (value[0] === '8') value = '7' + value.slice(1);
        if (value[0] !== '7') value = '7' + value;
    }

    // Форматируем как +7 (XXX) XXX-XX-XX
    let formatted = '+7';
    if (value.length > 1) {
        formatted += ' (' + value.slice(1, 4);
    }
    if (value.length >= 4) {
        formatted += ') ' + value.slice(4, 7);
    }
    if (value.length >= 7) {
        formatted += '-' + value.slice(7, 9);
    }
    if (value.length >= 9) {
        formatted += '-' + value.slice(9, 11);
    }

    input.value = formatted;
}

function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
}

// ============================================
// EXTERNAL LINKS — открытие внешних ссылок в новой вкладке
// ============================================

function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // Если ссылка ведёт на внешний сайт
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// ============================================
// INITIALIZE — запуск при загрузке страницы
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initDonationForm();
    initScrollAnimations();
    initParallax();
    initHeaderScroll();
    initPhoneFormatting();
    initExternalLinks();

    console.log('Зерно Веры — сайт загружен успешно! v2.0');
});
