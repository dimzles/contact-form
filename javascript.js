function checkEmail() {
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  email.addEventListener("input", () => {
    console.log(email.checkValidity());
    if (email.validity.valueMissing) {
      emailError.textContent = "This field is required.";
    } else if (email.validity.patternMismatch || email.validity.typeMismatch) {
      emailError.textContent = "Please enter a valid email address.";
    } else if (email.checkValidity()) {
      emailError.textContent = "";
    }
  });
}

checkEmail();
