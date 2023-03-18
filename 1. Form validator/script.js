const form = document.querySelector(".form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const MIN_CHARS_USERNAME = 3;
const MAX_CHARS_USERNAME = 15;
const MIN_CHARS_PASSWORD = 6;
const MAX_CHARS_PASSWORD = 25;

const showError = function (elem, msg) {
  const parent = elem.parentElement;
  parent.className = "form-group error";
  const small = parent.querySelector("small");
  small.innerText = msg;
};

const showSuccess = function (elem) {
  const parent = elem.parentElement;
  parent.className = "form-group success";
};

const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (re.test(input.value.trim())) {
    return true;
  } else {
    showError(input, "Email is not valid!");
    return false;
  }
};

const getFieldName = function (input) {
  const fieldName = input.id[0].toUpperCase() + input.id.slice(1);
  return fieldName;
};

const checkRequired = function (input) {
  if (input.value.trim() === "") {
    showError(input, `${getFieldName(input)} is required!`);
    return false;
  }
  return true;
};

const checkLength = function (input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters!`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters!`
    );
    return false;
  }

  return true;
};

const checkPasswordsMatch = function (pw1, pw2) {
  if (pw1.value !== pw2.value) {
    showError(pw2, "Passwords do not match!");
    return false;
  }

  return true;
};

const checkInputValidation = function (input) {
  let success = checkRequired(input);

  if (success) {
    switch (input.id) {
      case "username":
        success = checkLength(username, MIN_CHARS_USERNAME, MAX_CHARS_USERNAME);
        break;

      case "email":
        success = checkEmail(email);
        break;

      case "password":
        success = checkLength(password, MIN_CHARS_PASSWORD, MAX_CHARS_PASSWORD);
        break;

      case "password2":
        success = checkPasswordsMatch(password, password2);
        break;
    }
  }

  if (success) {
    showSuccess(input);
  }

  return success;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = [username, email, password, password2];

  const validates = inputs.reduce(function (a, input) {
    return checkInputValidation(input);
  }, true);

  if (validates) {
    inputs.forEach((input) => {
      input.value = "";
      input.parentElement.className = "form-group";
    });
  }
});
