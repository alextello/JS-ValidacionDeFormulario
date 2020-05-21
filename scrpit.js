const form = document.getElementById('form');
const usuario = document.getElementById('usuario');
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const password2 = document.getElementById('passwordConfirm');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkearRequerido([usuario, correo, password, password2]);
    // minimo y maximo
    checkLength(usuario, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(correo);
    checkPasswordsMatch(password, password2);
});


// Desplegar errores
function showError(input, message) {
    const formControl = input.parentElement; // El padre del input seria el form-control
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Indicar valores correctos
function showSucess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Verificar email
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSucess(input);
    } else {
        showError(input, 'El correo no es válido');
    }
}

// Verificar inputs requeridos
function checkearRequerido(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getName(input)} es requerido`);
        } else {
            showSucess(input);
        }
    })
}

// Retorna el nombre del input con inicial mayuscula
function getName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Verificar largo de input
function checkLength(input, min, max) {
    if (input.value.trim().length < min) {
        showError(input, `${getName(input)} debe tener al menos ${min} caracteres`);
    } else if (input.value.trim().length > max) {
        showError(input, `${getName(input)} no debe tener más de ${max} caracteres`);
    } else {
        showSucess(input);
    }
}

// Verificar password y confirmacion
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'La contraseña no coincide');
    } else if (input2.value.length > 0) {
        showSucess(input2);
    }
}