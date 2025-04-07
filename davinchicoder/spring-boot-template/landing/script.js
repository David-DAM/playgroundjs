const CLIENT_ID = "Ov23liL6cpiFgu0g7Tcr";
const REDIRECT_URI = window.location.uri + "/";
const LAMBDA_URL = "https://ju5le5a56wdrtplwd4staw4nxi0uonvz.lambda-url.eu-west-3.on.aws/";

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
    "template_description": {
        "es": "Plantilla de Spring Boot Definitiva",
        "en": "Spring Boot Ultimate Template"
    },
    "description": {
        "es": "Esta plantilla de Spring Boot incluye herramientas esenciales como Spring Security, JPA, PostgreSQL y Redis para crear aplicaciones robustas y seguras. También incluye un sistema de pruebas modular y una configuración de integración con Grafana Stack para monitoreo.",
        "en": "This Spring Boot template includes essential tools such as Spring Security, JPA, PostgreSQL, and Redis to create robust and secure applications. It also includes a modular testing system and integration with Grafana Stack for monitoring."
    },
    "connect-github": {
        "es": `<i class="fab fa-github"></i> CONECTAR`,
        "en": `<i class="fab fa-github"></i> CONNECT`
    },
    "proceed-payment": {
        "es": "Autentícate con tu cuenta de GitHub para proceder con el pago de la plantilla. ¡Es rápido y sencillo!",
        "en": "Authenticate with your GitHub account to proceed with the payment for the template. It's quick and easy!"
    },
    "look-video": {
        "es": "Mira el video donde hablo sobre esta plantilla y cómo usarla.",
        "en": "Watch the video where I talk about this template and how to use it."
    },
    "redirect": {
        "es": "Redirigiendo al pago...",
        "en": "Redirecting to payment..."
    },
    "fail-generate-payment": {
        "es": "No se pudo generar el enlace de pago por favor intentelo de nuevo",
        "en": "Payment link generation failed please try again"
    },
    "error-server": {
        "es": "Error de conexión con el servidor",
        "en": "Server connection error"
    },
    "authenticating": {
        "es": "Autenticando...",
        "en": "Authenticating..."
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

function connectToGitHub() {
    let language = sessionStorage.getItem("language") ?? "es";
    document.getElementById("status").innerText = translations.authenticating[language];
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user`;
}

async function redirectToPaymentLink(code) {
    let language = sessionStorage.getItem("language") ?? "es";
    try {
        const response = await fetch(LAMBDA_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({code, language})
        });

        const data = await response.json();

        if (data.payment_link) {
            document.getElementById("status").innerText = translations.redirect[language];
            window.location.href = data.payment_link;
        } else {
            document.getElementById("status").innerText = translations["fail-generate-payment"][language];
            document.getElementById("github-button").visibility = "visible";
        }
    } catch (error) {
        document.getElementById("status").innerText = translations["error-generate-payment"][language];
        document.getElementById("github-button").visibility = "visible";
        console.error(error);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const codeFromUrl = urlParams.get("code");

if (codeFromUrl) {
    let language = sessionStorage.getItem("language") ?? "es";
    document.getElementById("github-button").visibility = "hidden";
    document.getElementById("status").innerText = translations.authenticating[language];
    redirectToPaymentLink(codeFromUrl);
}


