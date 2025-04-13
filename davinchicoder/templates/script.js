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
    "info": {
        "es": "Esta plantilla de Spring Boot es una base preconfigurada, robusta y segura para construir aplicaciones modernas. Incluye:",
        "en": "This Spring Boot template is a pre-configured, robust, and secure base for building modern applications. It includes:"
    },
    "cli": {
        "es": `✅ <strong>Aplicación de terminal</strong> para autogenerarte código en otros proyectos de Spring Boot`,
        "en": `✅ <strong>Terminal application</strong> to auto-generate code in other Spring Boot projects`
    },
    "security": {
        "es": `✅ <strong>Spring Security</strong> para protección avanzada con JWT`,
        "en": `✅ <strong>Spring Security</strong> for advanced protection with JWT`
    },
    "database": {
        "es": `✅ <strong>Spring Data JPA</strong> para manejo eficiente de bases de datos como PostgreSQL o MySQL`,
        "en": `✅ <strong>Spring Data JPA</strong> for efficient database management like PostgreSQL or MySQL`
    },
    "cache": {
        "es": `✅ <strong>Redis</strong> para manejo de caché`,
        "en": `✅ <strong>Redis</strong> for cache management`
    },
    "kafka": {
        "es": `✅ <strong>Kafka</strong> para mensajería asíncrona`,
        "en": `✅ <strong>Kafka</strong> for asynchronous messaging`
    },
    "grafana": {
        "es": `✅ <strong>Grafana Stack</strong> para monitoreo de rendimiento`,
        "en": `✅ <strong>Grafana Stack</strong> for performance monitoring`
    },
    "testing": {
        "es": `✅ <strong>Test unitarios y de integración</strong> para un desarrollo ágil y eficiente`,
        "en": `✅ <strong>Unit and integration tests</strong> for agile and efficient development`
    },
    "documentation": {
        "es": `✅ <strong>OpenAPI con Swagger</strong> para mostrar fácilmente la documentación de tu API`,
        "en": `✅ <strong>OpenAPI with Swagger</strong> to easily display your API documentation`
    },
    "utilities": {
        "es": `✅ <strong>Múltiples funciones de utilidad</strong> como Mapstruct, Spring Devtools, Lombok y más`,
        "en": `✅ <strong>Multiple utility functions</strong> like Mapstruct, Spring Devtools, Lombok and more`
    },
};
const CLIENT_ID = "Ov23liL6cpiFgu0g7Tcr";
const REDIRECT_URI = window.location;

const LAMBDA_URL = "https://ju5le5a56wdrtplwd4staw4nxi0uonvz.lambda-url.eu-west-3.on.aws/";

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


