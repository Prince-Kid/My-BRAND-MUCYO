const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
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
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "") {
    setError(email, "Email is required");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else {
    setSuccess(password);
  }

  if (emailValue && passwordValue) {
    const userData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      fetch("https://my-brand-back-end-ts.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if (!res.ok) {
            document
              .getElementsByClassName("popUp-card1")[0]
              .classList.add("active");
            document
              .getElementById("dismiss-btn1")
              .addEventListener("click", function () {
                document
                  .getElementsByClassName("popUp-card1")[0]
                  .classList.remove("active");
                window.location.reload();

                throw new Error("Network Response Was Not Okay");
              });
          }

          return res.json();
        })
        .then((data) => {
          console.log("User Data", data);
          if (data.message === "login Success") {
            let token = data.token;
            localStorage.setItem("jwt", JSON.stringify(token));
            document
              .getElementsByClassName("popUp-card")[0]
              .classList.add("active");
            document
              .getElementById("dismiss-btn")
              .addEventListener("click", function () {
                document
                  .getElementsByClassName("popUp-card")[0]
                  .classList.remove("active");
                window.location.href = "./Admin/admin.html";
              });
          } else if (data.message === "Invalid Email Or Password") {
            document
              .getElementsByClassName("popUp-card1")[0]
              .classList.add("active");
            document
              .getElementById("dismiss-btn1")
              .addEventListener("click", function () {
                document
                  .getElementsByClassName("popUp-card1")[0]
                  .classList.remove("active");
                window.location.reload();
              });
          }
        });
    } catch (error) {
      console.log("There Was An Error In Connecton", error);
    }
  }
};
