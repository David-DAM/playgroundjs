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
    "buy": {
        "es": "COMPRAR EN AMAZON",
        "en": "BUY ON AMAZON"
    },
    "description": {
        "es": "Los periféricos que uso y recomiendo para programar, estudiar y crear contenido. Todos probados personalmente.",
        "en": "The gadgets I use and recommend for programming, studying, and creating content. All personally tested."
    },
    "title": {
        "es": "Periféricos | DavinchiCoder",
        "en": "Gadgets | DavinchiCoder"
    },
    "my_gadgets": {
        "es": "🚀️ Mis periféricos favoritos",
        "en": "️🚀️ My favorite gadgets"
    },
    "keyboard": {
        "es": "Teclado silencioso, cómodo y con gran autonomía. Perfecto para escribir durante horas.",
        "en": "Silent, comfortable keyboard with great autonomy. Perfect for writing for hours."
    },
    "mouse": {
        "es": "Ratón ergonómico con botones programables y scroll infinito. Ideal para productividad.",
        "en": "Ergonomic mouse with programmable buttons and infinite scroll. Ideal for productivity."
    },
    "monitor": {
        "es": "Monitor Full HD, frecuencia de actualización de 100 Hz y tecnología Eye-Care para proteger la vista.",
        "en": "Monitor with Full HD resolution, 100 Hz refresh rate and Eye-Care technology to protect your eyesight."
    },
    "webcam": {
        "es": "Webcam Full HD con micrófono integrado, ideal para videollamadas, streaming y contenido profesional.",
        "en": "Webcam with integrated microphone, ideal for video calls, streaming and professional content."
    },
    "speakers": {
        "es": "Altavoces con una potencia de 20W, diseño compacto y controles frontales para volumen y graves",
        "en": "Speakers with 20W power, compact design and front controls for volume and bass"
    },
    "graphic": {
        "es": "Tarjeta gráfica potente con 12 GB de memoria, Ray Tracing y DLSS para gráficos realistas y un rendimiento optimizado",
        "en": "Graphic card with 12 GB of memory, Ray Tracing and DLSS for realistic graphics and optimized performance"
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
        element.innerHTML = language === 'en' ? translations[key].en : translations[key].es;
    });
}

function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('show');
}
