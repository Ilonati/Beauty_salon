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
document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash; // например, #permanente

    if (hash) {
        const section = document.querySelector(hash);
        const accordionContent = section?.querySelector(".accordion-content");
        const title = section?.querySelector(".accordion-title");

        if (accordionContent && title) {
            // Открываем нужный блок
            accordionContent.style.display = "block";
            accordionContent.classList.add("open");
            title.classList.add("active");

            // Плавно прокручиваем к нужной секции
            setTimeout(() => {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
        }
    }

    // Добавляем функционал открытия/закрытия при клике (если его ещё нет)
    const titles = document.querySelectorAll(".accordion-title");
    titles.forEach((t) => {
        t.addEventListener("click", () => {
            const content = t.nextElementSibling;

            if (content.classList.contains("open")) {
                content.style.display = "none";
                content.classList.remove("open");
                t.classList.remove("active");
            } else {
                // Закрываем остальные
                document.querySelectorAll(".accordion-content.open").forEach((openEl) => {
                    openEl.style.display = "none";
                    openEl.classList.remove("open");
                    openEl.previousElementSibling.classList.remove("active");
                });

                // Открываем выбранный
                content.style.display = "block";
                content.classList.add("open");
                t.classList.add("active");
            }
        });
    });
});