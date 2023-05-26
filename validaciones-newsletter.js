// Validación de email ingresado en el Newsletter

// Obtener referencias a los elementos del formulario
var formulario = document.getElementById("form-news");
var emailInput = document.getElementById("email-news");
var advertencia = document.getElementById("advertencia-news");
var mensajeExito = document.getElementById("mensaje-exito-news");

// Agregar el evento 'submit' al formulario
formulario.addEventListener("submit", function (event) {
    // Detener el envío del formulario
    event.preventDefault();

    // Validar el campo de correo electrónico
    var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value === "") {
        advertencia.textContent = "Por favor, ingresa tu correo electrónico.";
        mensajeExito.textContent = "";
        return;
    } else if (!correoRegex.test(emailInput.value)) {
        advertencia.textContent = "Por favor, ingresa un correo electrónico válido.";
        mensajeExito.textContent = "";
        return;
    }

    // Enviar un correo electronico por medio de EmailJS utilizando las credenciales generadas en el servicio
    // Constantes predetermindas por el servicio de EmailJS (se refieren al servicio utilizado y a la plantilla de correos creada)
    const serviceID = 'default_service';
    const templateID = 'template_owxi3is';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // Si la validación es exitosa, muestra el mensaje de éxito se envia un correo a la cuenta configurada de Sonar
            mensajeExito.textContent = "¡Gracias por suscribirte a nuestro Newsletter!";
        }, (err) => {
            // En caso de error en el envio del formulario se informa al usuario con un mensaje  
            advertencia.textContent = "Error de conexión. Por favor intenta en unos minutos";
        });

    // Restablecer el formulario
    formulario.reset();
    advertencia.textContent = "";
});


