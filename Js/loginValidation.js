const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
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


const validateInputs = () => {
   
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();



    if(emailValue === '') {
        setError(email, 'Email is required');
    }
    else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    }
    else {
        setSuccess(password);
    }

   if(emailValue && passwordValue > 8){
    window.location.href = "./Admin/admin.html";
   }
   
    
};
