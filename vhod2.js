const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Имя пользователя обязательно к заполнению');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email необходим для входа');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Проверьте корректность  email адресса');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Пароль необходим для входа');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Парольне может быть меньше 8 символов.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Повторите ваш пароль');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Пороли не совподают");
    } else {
        setSuccess(password2);
    }

};
