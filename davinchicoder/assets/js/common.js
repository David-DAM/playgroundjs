function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('show');
}

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