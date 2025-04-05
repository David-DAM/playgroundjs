function subscribe() {
    const emailInput = document.getElementById('email');
    const message = document.getElementById('message');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        alert('Por favor introduce un email válido.');
        return;
    }

    // Aquí iría tu integración real con un backend o servicio de email
    emailInput.disabled = true;
    message.style.display = 'block';
}