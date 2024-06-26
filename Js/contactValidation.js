const form = document.getElementById("form");
const namesInput = document.getElementById("names");
const emailInput = document.getElementById("email");
const textAreaInput = document.getElementById("teaxtArea");
const userFeedback = document.querySelector(".messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInputs = () => {
  const nameValue = namesInput.value.trim();
  const emailValue = emailInput.value.trim();
  const textValue = textAreaInput.value.trim();

  if (nameValue === "") {
    setError(namesInput, "Your Names are required");
  } else {
    setSuccess(namesInput);
  }

  if (emailValue === "") {
    setError(emailInput, "Your Email is required");
  } else {
    setSuccess(emailInput);
  }

  if (textValue === "") {
    setError(textAreaInput, "Please Enter Your Message");
  } else {
    setSuccess(textAreaInput);
  }

  if (emailValue && nameValue && textValue) {
    alert("Your Message Received Successfully. Thank You!");
    window.location.reload();
    const newFeedback = addFeedback(nameValue, emailValue, textValue);
    createFeedback(newFeedback);

    namesInput.value = "";
    emailInput.value = "";
    textAreaInput.value = "";

    window.location.href = `index.html`;
  }
};

const addFeedback = (names, email, text) => {
  const feedback = { names, email, text };
  const existingFeedback = localStorage.getItem("Feedback");
  const feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];
  feedbackList.push(feedback);
  localStorage.setItem("Feedback", JSON.stringify(feedbackList));
  return feedback;
};

const createFeedback = (feedback) => {
  const feedbackCard = document.createElement("tr");
  const userName = document.createElement("td");
  const userEmail = document.createElement("td");
  const userText = document.createElement("td");

  userName.innerHTML = feedback.names;
  userEmail.innerHTML = feedback.email;
  userText.innerHTML = feedback.text;

  feedbackCard.append(userName, userEmail, userText);
  userFeedback.appendChild(feedbackCard);
};

const existingFeedback = localStorage.getItem("Feedback");
if (existingFeedback) {
  const feedbackList = JSON.parse(existingFeedback);
  feedbackList.forEach(createFeedback);
}
