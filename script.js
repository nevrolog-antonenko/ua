// Плавний скрол до якорів
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        // Закрити мобільне меню після вибору
        document.querySelector('.mobile-nav').classList.remove('active');
        document.querySelector('.mobile-menu-toggle').classList.remove('open'); // Закриваємо іконку
        document.body.style.overflow = 'auto';
    });
});

// Обробка мобільного меню
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuToggle.classList.toggle('open'); // Додаємо/знімаємо клас для анімації іконки
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
});

// Обробка вкладок
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Обробка перемикання теми
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Завантаження збереженої теми
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Обробка форми
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Дякуємо за заявку! Ми зв’яжемося з вами найближчим часом.');
    // Тут можна додати відправку даних форми на сервер
    this.reset(); // Очистити форму
});


// === ЛОГІКА АНІМАЦІЇ ЛОГОТИПУ ПРИ ПЕРШОМУ ЗАВАНТАЖЕННІ ===
document.addEventListener('DOMContentLoaded', function() {
    const logoAnimationContainer = document.getElementById('logoAnimationContainer');

    // Перевіряємо, чи користувач вже відвідував сайт (використовуючи sessionStorage)
    if (sessionStorage.getItem('visited')) {
        // Якщо вже відвідував, одразу приховуємо анімацію
        if (logoAnimationContainer) { // Перевірка на існування елемента
            logoAnimationContainer.style.display = 'none';
            logoAnimationContainer.remove(); // Видаляємо елемент з DOM
        }
    } else {
        // Якщо вперше, показуємо анімацію
        if (logoAnimationContainer) { // Перевірка на існування елемента
            logoAnimationContainer.style.display = 'flex'; // Переконайтеся, що це відображає контейнер
            sessionStorage.setItem('visited', 'true'); // Зберігаємо позначку про відвідування

            // Запускаємо таймер, щоб приховати анімацію після завершення
            setTimeout(function() {
                logoAnimationContainer.classList.add('hidden');
                // Видаляємо елемент з DOM після повного зникнення,
                // щоб він не заважав взаємодії з елементами під ним
                setTimeout(function() {
                    if (logoAnimationContainer) { // Перевірка на існування елемента перед видаленням
                        logoAnimationContainer.remove();
                    }
                }, 1000); // Час має відповідати transition в CSS (.logo-animation-container)
            }, 2000); // 2000 мс = 2 секунди. Це тривалість анімації + невеликий запас.
                      // Анімація img триває 1.5s, тому 2s дадуть їй повністю завершитися.
        }
    }
});