// FAQ toggle
const questions = document.querySelectorAll('.faq-question');

questions.forEach(q => {
    q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});


// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});