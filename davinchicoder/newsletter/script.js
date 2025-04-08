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
        "es": "Recibe cada domingo lo mejor del mundo tech, herramientas brutales, recursos, recomendaciones y más. 100% útil, 0% spam.",
        "en": "Receive the best of the tech world every Sunday, including awesome tools, resources, recommendations, and more.100% helpful, 0% spam."
    },
    "click_here": {
        "es": "MOSTRAR FORMULARIO",
        "en": "SHOW FORM"
    },
};

if (sessionStorage.getItem("language")) {
    changeLanguage(sessionStorage.getItem("language"));
}

function changeLanguage(language) {
    let elements = document.querySelectorAll("[data-i18n]");
    sessionStorage.setItem("language", language);
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = language === 'en' ? translations[key].en : translations[key].es;
    });
}

function toggleMenu() {
    const nav = document.getElementById("nav");
    nav.classList.toggle("show");
}

(function (w, d, e, u, f, l, n) {
    w[f] = w[f] || function () {
        (w[f].q = w[f].q || [])
            .push(arguments);
    }, l = d.createElement(e), l.async = 1, l.src = u,
        n = d.getElementsByTagName(e)[0], n.parentNode.insertBefore(l, n);
})
(window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
ml('account', '1266504');