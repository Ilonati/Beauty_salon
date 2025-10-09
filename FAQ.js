// FAQ toggle
const faqs = [
    {
        question: "Comment prendre rendez-vous ?",
        answer: "Vous pouvez réserver un rendez-vous en m’écrivant sur WhatsApp, par e-mail, ou simplement en appelant le 0786606313."
    },
    {
        question: "Est-il nécessaire de faire une consultation préalable ?",
        answer: "Oui, il est possible de réserver une consultation gratuite de 30 minutes. Cela permet de répondre à vos questions, d’évaluer vos besoins et de choisir ensemble la meilleure solution pour vous."
    },
    {
        question: "Quelles mesures d’hygiène et de stérilisation utilisez-vous ?",
        answer: "J’utilise uniquement des matériaux certifiés et conformes aux normes d’hygiène. De plus, j’ai suivi une formation en désinfection et stérilisation à Bayonne, afin de garantir à mes clientes un maximum de sécurité et de qualité."
    },
    {
        question: "Quels sont les tarifs et proposez-vous des forfaits ou réductions ?",
        answer: "Les tarifs sont indiqués directement sur le site. Des réductions sont proposées pour les clientes fidèles."
    },
    {
        question: "Quelles techniques de maquillage permanent utilisez-vous ?",
        answer: "Quelles techniques de maquillage permanent utilisez-vous ? J’utilise différentes techniques adaptées aux besoins de chaque cliente : • Sourcils : technique poudrée et technique poil par poil naturel • Lèvres : technique aquarelle et technique « rouge à lèvres mat » • Yeux : technique poudrée avec effet « ras de cils poudré » En manucure, j’emploie également plusieurs techniques modernes pour un résultat élégant et soigné."
    },
    {
        question: "Faut-il une retouche après la première séance ?",
        answer: "Faut-il une retouche après la première séance ? Oui, la retouche est obligatoire pour le maquillage permanent des sourcils et des yeux. Pour le maquillage permanent des lèvres, la retouche n’est pas indispensable — elle est proposée uniquement si vous souhaitez intensifier la couleur."
    },
    {
        question: "Puis-je faire un maquillage permanent si j’ai des allergies ?",
        answer: "Puis-je faire un maquillage permanent si j’ai des allergies ? Non.Les allergies constituent une contre- indication absolue à la procédure. Lors de la consultation, j’explique en détail quelles sont les contre - indications absolues et quels risques éventuels peuvent exister."
    },
    {
        question: "Quels sont les risques du maquillage permanent ?",
        answer: "Quels sont les risques du maquillage permanent ? Comme pour toute procédure esthétique, il peut exister certains risques : rougeurs temporaires, légers gonflements ou petites croûtes pendant la cicatrisation. Ces effets sont généralement passagers. Grâce à l’utilisation de matériels certifiés, de techniques modernes et au respect strict des règles d’hygiène, les risques sont minimisés. Lors de la consultation, j’informe toujours mes clientes sur les précautions à prendre et les éventuelles contre-indications."
    },
    {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Le règlement peut se faire par carte bancaire, en espèces ou par virement. Les chèques ne sont pas acceptés. Pour réserver un rendez-vous de maquillage permanent, un acompte de 50 € est obligatoire. Ce montant sera ensuite déduit du prix total de la prestation."
    }
];

const faqList = document.getElementById("faqList");


faqs.forEach((faq) => {
    const item = document.createElement("div");
    item.classList.add("faq-item");

    const question = document.createElement("div");
    question.classList.add("faq-question");
    question.innerHTML = `
    <span>${faq.question}</span>
    <span class="faq-icon">▶</span>
  `;

    const answer = document.createElement("div");
    answer.classList.add("faq-answer");
    answer.innerText = faq.answer;

    question.addEventListener("click", () => {
        const isOpen = answer.classList.contains("open");
        document.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("open"));
        document.querySelectorAll(".faq-icon").forEach(icon => icon.classList.remove("open"));

        if (!isOpen) {
            answer.classList.add("open");
            question.querySelector(".faq-icon").classList.add("open");
        }
    });

    item.appendChild(question);
    item.appendChild(answer);
    faqList.appendChild(item);
});



// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

