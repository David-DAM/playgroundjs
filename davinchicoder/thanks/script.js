const params = new URLSearchParams(window.location.search);
const language = params.get("language") ?? "es";
const githubUsername = params.get("user") ?? "user";

const translations = {
    "home": {
        "es": "INICIO",
        "en": "HOME"
    },
    "templates": {
        "es": "PLANTILLAS",
        "en": "TEMPLATES"
    },
    "consultancies": {
        "es": "ASESORÍAS",
        "en": "CONSULTANCIES"
    },
    "newsletter": {
        "es": "NEWSLETTER",
        "en": "NEWSLETTER"
    },
    "gadgets": {
        "es": "PERIFÉRICOS",
        "en": "GADGETS"
    },
    "description": {
        "es": "Recibirás un correo electrónico con la invitación al repositorio.",
        "en": "You will receive an email with the repository invitation.",
    },
    "title": {
        "es": "¡Gracias por tu compra! 🎉",
        "en": "Thank you for your purchase! 🎉"
    },
    "message": {
        "es": `Gracias, <span class="highlight">${githubUsername}</span>, por tu apoyo.`,
        "en": `Thank you, <span class="highlight">${githubUsername}</span>, for your support.`
    },
    "access": {
        "es": `O trata de acceder directamente en el siguiente <a href="https://github.com/David-DAM/spring-boot-web-template-pro">ENLACE</a>`,
        "en": `Or try to access directly at the following <a href="https://github.com/David-DAM/spring-boot-web-template-pro">LINK</a>`
    },
};

function changeLanguage(language) {
    let elements = document.querySelectorAll("[data-i18n]");
    sessionStorage.setItem("language", language);
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.innerHTML = language === 'en' ? translations[key].en : translations[key].es;
    });
}

function toggleMenu() {
    const nav = document.getElementById("nav");
    nav.classList.toggle("show");
}