const translations = {
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
    "self_description": {
        "es": "Desarrollador apasionado, divulgador incansable y comprometido en ayudarte a crecer en el mundo del desarrollo",
        "en": "Passionate developer, tireless communicator and committed to helping you grow in the development world"
    },
};

function changeLanguage(language) {
    let elements = document.querySelectorAll("[data-i18n]");
    sessionStorage.setItem("language", language);
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = language === 'en' ? translations[key].en : translations[key].es;
    });
}
