const params = new URLSearchParams(window.location.search);
const language = params.get("language") ?? "es";
const githubUsername = params.get("user") ?? "user";

const translations = {
    es: {
        title: "¡Gracias por tu compra! 🎉",
        message: `Gracias, <span class="highlight">${githubUsername}</span>, por tu apoyo.`,
        description: "Recibirás un correo electrónico con la invitación al repositorio.",
        access: `O trata de acceder directamente en el siguiente <a href="https://github.com/David-DAM/spring-boot-web-template-pro">ENLACE</a>`
    },
    en: {
        title: "Thank you for your purchase! 🎉",
        message: `Thank you, <span class="highlight">${githubUsername}</span>, for your support.`,
        description: "You will receive an email with the repository invitation.",
        access: `Or try to access directly at the following <a href="https://github.com/David-DAM/spring-boot-web-template-pro">LINK</a>`
    }
};

document.getElementById("titleHead").innerHTML = translations[language].title;
document.getElementById("titleBody").innerHTML = translations[language].title;
document.getElementById("message").innerHTML = translations[language].message;
document.getElementById("description").innerHTML = translations[language].description;
document.getElementById("access").innerHTML = translations[language].access;