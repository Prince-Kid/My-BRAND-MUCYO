const form = document.getElementById('form');
const names = document.getElementById('names');
const email = document.getElementById('email');
const text = document.getElementById('teaxtArea');

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
   
    const nameValue = names.value.trim();
    const emailValue = email.value.trim();
    const textValue = text.value.trim();


    if(nameValue === '') {
        setError(names, 'Your Names are required');
    }
    else {
        setSuccess(names);
    }

    if(emailValue === '') {
        setError(email, 'Your Email is required');
    } 
    else {
        setSuccess(email);
    }

    if(textValue === '') {
        setError(text, 'Please Enter Your Message');
    }
    else {
        setSuccess(text);
    }

   if(emailValue && nameValue  && textValue){
   alert("Your Message Received SuccessFully Thank You !!!!")
   }
   
    
};
