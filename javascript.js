function checkEmail() {
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

window.onload = () => {
  document.getElementById("country").onchange = validatePostCode;
  document.getElementById("post-code").oninput = validatePostCode;
};

checkEmail();
