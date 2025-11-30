const header = document.querySelector('.header');
const burger = document.getElementById('burger');

header.addEventListener('click', (e) => {

    if (e.target === burger) return;


    window.location.href = 'index.html';
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
/* translateMenu */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr'
    }, 'google_translate_element');
}
const btn = document.getElementById('translateBtn');
const menu = document.getElementById('translateMenu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

function changeLang(lang) {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
    }
    menu.classList.add('hidden');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.translate-widget')) {
        menu.classList.add('hidden');
    }
});
// Burger menu

const nav = document.getElementById('nav');

burger.addEventListener('click', () => {


    nav.classList.toggle('active');


    if (nav.classList.contains('active')) {
        burger.textContent = "✖";
    } else {
        burger.textContent = "☰";
    }
});
// scroll 
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
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nom: e.target.nom.value,
        prenom: e.target.prenom.value,
        email: e.target.email.value,
        telephone: e.target.telephone.value,
        sujet: e.target.sujet.value,
        message: e.target.message.value
    };

    const res = await fetch("https://beauty-backend.onrender.com/formulaireRoutes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert("Message envoyé !");
        e.target.reset();
    } else {
        alert("Erreur, réessayez.");
    }
});
