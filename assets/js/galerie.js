const header = document.querySelector('.header');
const burger = document.getElementById('burger');

header.addEventListener('click', (e) => {
    // Если кликнули по бургеру — не переходим на главную
    if (e.target === burger) return;

    // Иначе — переходим
    window.location.href = 'index.html';
});
// Burger menu



const nav = document.getElementById("nav");
const closeBtn = document.getElementById("close-btn");

burger.addEventListener("click", () => {
    nav.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    nav.classList.remove("active");
});
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

// === scroll ===
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Все изображения галереи
const images = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCloseBtn = document.getElementById('lightbox-close');

// Создаём стрелки
const prevBtn = document.createElement('div');
const nextBtn = document.createElement('div');
prevBtn.className = 'lightbox-prev';
nextBtn.className = 'lightbox-next';
prevBtn.innerHTML = '❮';
nextBtn.innerHTML = '❯';
lightbox.appendChild(prevBtn);
lightbox.appendChild(nextBtn);

let currentIndex = 0;

// Функция открытия фото
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.style.display = 'flex';
}

// Открытие по клику
images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

// Закрытие
lightboxCloseBtn.addEventListener('click', () => (lightbox.style.display = 'none'));
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

// Переключение
function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
}
function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Навигация стрелками клавиатуры
document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') lightbox.style.display = 'none';
    }
});

// === АККОРДЕОН ===
const titles = document.querySelectorAll('.accordion-title');
titles.forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        const isActive = content.classList.contains('active');

        // Закрываем все
        document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.accordion-title').forEach(t => t.classList.remove('active'));

        // Если кликнули на неактивный — открыть
        if (!isActive) {
            title.classList.add('active');
            content.classList.add('active');
        }
    });
});

//  Автоматически открыть первую секцию (например, Manucure)
const firstTitle = document.querySelector('.accordion-title');
if (firstTitle) {
    firstTitle.classList.add('active');
    const firstContent = firstTitle.nextElementSibling;
    if (firstContent) firstContent.classList.add('active');
}

// === scroll ===
// const scrollBtn = document.getElementById('scrollTopBtn');

// window.addEventListener('scroll', () => {
//     if (window.scrollY > 400) {
//         scrollBtn.classList.add('show');
//     } else {
//         scrollBtn.classList.remove('show');
//     }
// });

// scrollBtn.addEventListener('click', () => {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// });


