/* codigo para el boton tipo hamburguea en dispositivos moviles */

document.addEventListener('DOMContentLoaded',() => {
    const burguer = document.querySelector('.burguer');
    const navLinks = document.querySelector('.nav-links')

    burguer.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        });
    });

    /* codigo para hacer funcionar el formulario */

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');

        const formData = new FormData(this);

        fetch('/send_email', {
            method: 'POST',
            body: formData
            })
            .then(response => response.text())
            .then(data => {
                showFlashMessage('Mensaje enviado correctamente.', 'succes');
                this.reset(); // Limpia el formulario
                submitButton.classList.remove('loading');
                })
                .catch(error => {
                    showFlashMessage('Error al enviar el mensaje.', 'danger');
                    console.error('Error', error);
                    submitButton.classList.remove('loading');
                    });
                });

function showFlashMessage(message, category) {
    const flashContainer = document.getElementById('flash-message');
    const flashMessage = document.createElement('div');
    flashMessage.className = `alert-${category}`;
    flashMessage.textContent = message;

    flashContainer.appendChild(flashMessage);
    
    setTimeout(() => {
        flashMessage.remove();
        }, 5000);
        }

        const h2Elements = document.querySelectorAll('.contact-section h2');

h2Elements.forEach(h2 => {
  h2.addEventListener('click', () => {
    const linea = h2.querySelector('.linea-subrayado');
    linea.style.transform = linea.style.transform === 'scaleX(1)' ? 'scaleX(0)' : 'scaleX(1)';
  });
});
