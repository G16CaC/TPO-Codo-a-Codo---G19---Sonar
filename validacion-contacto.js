// Esperamos a que el DOM se cargue completamente
document.addEventListener("DOMCargarContenido", function () {
  // Obtenemos el formulario y los campos del DOM
  var form = document.getElementById("contacto-form");
  var nombreInput = document.getElementById("nombre-contacto");
  var apellidoInput = document.getElementById("apellido-contacto");
  var emailInput = document.getElementById("email-contacto");
  var seleccionInput = document.getElementById("seleccion-contacto");
  var terminosCheckbox = document.getElementById("contacto-terminos");

  // Agregamos un evento de escucha al formulario cuando se envía
  form.addEventListener("submit", function (event) {
    // Detiene el envío del formulario
    event.preventDefault();

    // Limpia los mensajes de error existentes
    clearErrorMessages();

    // Creamos un objeto para almacenar los campos con errores y sus mensajes
    var camposConError = {};

    // Validamos los campos del formulario controlando que no se encuentren vacios y por medio de expresiones regulares
    // controlamos que se ingresen los caracteres correctos de acuerdo al campo correspondiente
    if (nombreInput.value.trim() === "") {
      camposConError["nombre"] = "Ingrese su nombre";
      nombreInput.classList.add("error");
    } else if (!/^[a-zA-Z\s]+$/.test(nombreInput.value.trim())) {
      camposConError["nombre"] = "Ingrese solo letras en el campo de nombre";
      nombreInput.classList.add("error");
    } else {
      nombreInput.classList.remove("error");
    }

    if (apellidoInput.value.trim() === "") {
      camposConError["apellido"] = "Ingrese su apellido";
      apellidoInput.classList.add("error");
    } else if (!/^[a-zA-Z\s]+$/.test(apellidoInput.value.trim())) {
      camposConError["apellido"] = "Ingrese solo letras en el campo de apellido";
      apellidoInput.classList.add("error");
    } else {
      apellidoInput.classList.remove("error");
    }

    if (emailInput.value.trim() === "") {
      camposConError["email"] = "Ingrese su correo electrónico";
      emailInput.classList.add("error");
    } else if (!isValidEmail(emailInput.value.trim())) {
      camposConError["email"] = "Ingrese una dirección de correo electrónico válida";
      emailInput.classList.add("error");
    } else {
      emailInput.classList.remove("error");
    }

    if (seleccionInput.value === "") {
      camposConError["seleccion"] = "Seleccione una opción";
      seleccionInput.classList.add("error");
      var opcionesLabel = document.getElementById("opciones-label");
      var errorElement = document.createElement("span");
      errorElement.classList.add("error-message");
      errorElement.textContent = "Debe seleccionar una opción";
      opcionesLabel.parentNode.insertBefore(errorElement, opcionesLabel.nextSibling);
    } else {
      seleccionInput.classList.remove("error");
    }

    if (!terminosCheckbox.checked) {
      camposConError["terminos"] = "Debe aceptar los términos";
      terminosCheckbox.classList.add("error");
    } else {
      terminosCheckbox.classList.remove("error");
    }

    // Si hay campos con error, muestra los mensajes de error debajo de cada campo
    if (Object.keys(camposConError).length > 0) {
      Object.keys(camposConError).forEach(function (campo) {
        var errorMessage = camposConError[campo];
        var field = document.getElementById(campo + "-label");
        var errorElement = document.createElement("span");
        errorElement.classList.add("error-message");
        errorElement.textContent = errorMessage;
        field.appendChild(errorElement);
      });
    } else {
      // Si el formulario es válido, entonces enviamos los datos
      // Enviar un correo electronico por medio de EmailJS utilizando las credenciales generadas en el servicio
      
      // Constantes predetermindas por el servicio de EmailJS (se refieren al servicio utilizado y a la plantilla de correos creada)
      const serviceID = 'default_service';
      const templateID = 'template_8emcekg';

      emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        alert("Tu consulta fué enviada exitosamente. Al aceptar serás redirigido a nuestra página de inicio");
      }, (err) => {
        alert("Ha ocurrido un error. Por favor intenta nuevamente en unos minutos. Al aceptar serás redirigido a nuestra página de inicio");
      });

      // Redirigimos al usuario a la página "index.html" al aceptar la advertencia después de 3 segundos
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000);
    }
  });

  // Función para limpiar los mensajes de error
  function clearErrorMessages() {
    var errorMessages = document.getElementsByClassName("error-message");
    while (errorMessages.length > 0) {
      errorMessages[0].parentNode.removeChild(errorMessages[0]);
    }
  }

  // Función para validar una dirección de correo electrónico
  function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

