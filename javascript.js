function validateEmail() {
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  email.addEventListener("input", () => {
    console.log(email.checkValidity());
    if (email.validity.valueMissing) {
      emailError.textContent = "This field is required.";
      email.setCustomValidity("This field is required.");
    } else if (email.validity.patternMismatch || email.validity.typeMismatch) {
      emailError.textContent = "Please enter a valid email address.";
      email.setCustomValidity("Please enter a valid email address.");
    } else if (email.checkValidity()) {
      email.setCustomValidity("");
      emailError.textContent = "";
    }
  });
}

function validatePostCode() {
  const CONSTRAINTS = {
    gb: [
      "^[a-z]{1,2}\\d[a-z\\d]?\\s*\\d[a-z]{2}",
      "Please enter a valid Post Code e.g WC2N 5DS",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS.",
    ],
  };

  const COUNTRY = document.getElementById("country").value;
  const POST_CODE_FIELD = document.getElementById("post-code");
  const POST_CODE_ERROR = document.getElementById("post-error");

  const CONSTRAINT = new RegExp(CONSTRAINTS[COUNTRY][0], "i");
  console.log(CONSTRAINT);

  if (!CONSTRAINT.test(POST_CODE_FIELD.value)) {
    POST_CODE_FIELD.setCustomValidity(CONSTRAINTS[COUNTRY][1]);
    POST_CODE_ERROR.textContent = CONSTRAINTS[COUNTRY][1];
  } else {
    POST_CODE_FIELD.setCustomValidity("");
    POST_CODE_ERROR.textContent = "";
  }
}

function validatePassword() {
  const PASSWORD_INPUT = document.getElementById("password");
  const PASSWORD_CONFIRM = document.getElementById("password-confirm");
  const PASSWORD_ERROR = document.getElementById("password-error");
  const PASSWORD_CONFIRM_ERROR = document.getElementById(
    "password-confirm-error"
  );

  PASSWORD_INPUT.addEventListener("input", () => {
    console.log(PASSWORD_INPUT.value, PASSWORD_CONFIRM.value);
    console.log(PASSWORD_INPUT.value === PASSWORD_CONFIRM.value);

    if (PASSWORD_INPUT.validity.valueMissing) {
      PASSWORD_INPUT.setCustomValidity("This field is required.");
      PASSWORD_ERROR.textContent = "This field is required.";
    } else if (PASSWORD_INPUT.value !== PASSWORD_CONFIRM.value) {
      PASSWORD_INPUT.setCustomValidity("Passwords must match.");
      PASSWORD_CONFIRM.setCustomValidity("Passwords must match.");

      PASSWORD_ERROR.textContent = "Passwords must match.";
      PASSWORD_CONFIRM_ERROR.textContent = "Passwords must match.";
    } else if (PASSWORD_INPUT.value === PASSWORD_CONFIRM.value) {
      PASSWORD_INPUT.setCustomValidity("");
      PASSWORD_CONFIRM.setCustomValidity("");
      PASSWORD_ERROR.textContent = "";
      PASSWORD_CONFIRM_ERROR.textContent = "";
    }
  });

  PASSWORD_CONFIRM.addEventListener("input", () => {
    if (PASSWORD_CONFIRM.validity.valueMissing) {
      PASSWORD_CONFIRM.setCustomValidity("This field is required.");
      PASSWORD_CONFIRM_ERROR.textContent = "This field is required.";
    } else if (PASSWORD_CONFIRM.value === PASSWORD_INPUT.value) {
      PASSWORD_INPUT.setCustomValidity("");
      PASSWORD_CONFIRM.setCustomValidity("");
      PASSWORD_ERROR.textContent = "";
      PASSWORD_CONFIRM_ERROR.textContent = "";
    }
  });
}

window.onload = () => {
  document.getElementById("country").onchange = validatePostCode;
  document.getElementById("post-code").oninput = validatePostCode;
};

validateEmail();
validatePassword();
