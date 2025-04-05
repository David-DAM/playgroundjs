/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert(`Has pulsado el botón: ${button.textContent}`);
        });
    });
});
