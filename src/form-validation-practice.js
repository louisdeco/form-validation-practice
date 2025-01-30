import "./css/style.css";

const formValidation = (function () {
  const init = () => {
    const form = document.querySelector("form");
    const fields = [
      "mail",
      "country",
      "zipcode",
      "password",
      "password-confirmation",
    ];
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      fields.forEach(showError);
    });
    fields.forEach((fieldId) => {
      const field = document.querySelector(`#${fieldId}`);
      const fieldError = document.querySelector(`#${fieldId} + p.error`);
      field.addEventListener("input", () => {
        if (field.validity.valid) {
          fieldError.textContent = "";
        } else {
          showError(fieldId);
        }
      });
    });
  };

  const showError = (fieldId) => {
    console.log(fieldId);
    const field = document.querySelector(`#${fieldId}`);
    const fieldError = document.querySelector(`#${fieldId} + p.error`);
    const errorMessages = {
      valueMissing: {
        mail: "You need to enter an email address.",
        country: "You need to enter a country.",
        zipcode: "You need to enter a zip code.",
        password: "You need to enter a password.",
        "password-confirmation": "You need to confirm your password.",
      },
      typeMismatch: {
        mail: "You must enter a valid email address.",
        country: "You must enter a valid country.",
        zipcode: "You must enter a valid zip code.",
      },
      tooShort: (field, fieldId) =>
        `${fieldId === "password-confirmation" ? "password confirmation" : fieldId} should be at least ${field.minLength} characters.`,
    };
    if (field.validity.valueMissing) {
      fieldError.textContent = errorMessages.valueMissing[fieldId];
    } else if (field.validity.typeMismatch) {
      fieldError.textContent = errorMessages.typeMismatch[fieldId];
    } else if (field.validity.tooShort) {
      fieldError.textContent = errorMessages.tooShort(field, fieldId);
    }
  };

  return { init };
})();

formValidation.init();
