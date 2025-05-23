// Плавний скрол до якорів
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            const mobileNav = document.querySelector('.mobile-nav');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileNav && menuToggle) {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Обробка мобільного меню
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Обробка вкладок
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const buttons = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.tab-content');
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        const tabId = button.dataset.tab;
        if (tabId) {
            document.getElementById(tabId).classList.add('active');
        }
    });
});

// Обробка перемикання теми
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
}

// Завантаження збереженої теми
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Обробка форми з Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Залишаємо, щоб контролювати поведінку вручну
        const formData = new FormData(this);
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                this.reset(); // Очищаємо форму перед редиректом
                window.location.href = 'https://nevrolog-antonenko.github.io/ua/thanks.html'; // Редирект
            } else {
                throw new Error('Помилка при відправці');
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Сталася помилка при відправці. Спробуйте ще раз або зверніться пізніше.');
        });
    });
}

// Анімація логотипу при першому завантаженні
document.addEventListener('DOMContentLoaded', function() {
    const logoAnimationContainer = document.getElementById('logoAnimationContainer');

    if (logoAnimationContainer) {
        if (sessionStorage.getItem('visited')) {
            logoAnimationContainer.style.display = 'none';
            logoAnimationContainer.remove();
        } else {
            logoAnimationContainer.style.display = 'flex';
            sessionStorage.setItem('visited', 'true');

            setTimeout(function() {
                logoAnimationContainer.classList.add('hidden');
                setTimeout(function() {
                    if (logoAnimationContainer) {
                        logoAnimationContainer.remove();
                    }
                }, 1000);
            }, 2000);
        }
    }
});

// Анімація лічильників
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + (target > 999 ? '+' : '');
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (target > 999 ? '+' : '');
            }
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (counter) {
            observer.observe(counter);
        }
    });
}

// Виклик функції при завантаженні сторінки
window.addEventListener('load', animateCounters);