const $form = document.querySelector(".form");
const $username = document.querySelector("#username");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $passwordConfirm = document.querySelector("#password-confirm");

const MIN_CHARS_USERNAME = 3;
const MAX_CHARS_USERNAME = 15;
const MIN_CHARS_PASSWORD = 6;
const MAX_CHARS_PASSWORD = 25;
const NUM_INPUTS = 4;

const showError = function (elem, msg) {
  const $parent = elem.parentElement;
  $parent.className = "form-group error";
  const $small = $parent.querySelector("small");
  $small.innerText = msg;
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
  }

  showError(input, "Email is not valid!");
  return false;
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
  }

  if (input.value.length > max) {
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
  const isFilled = checkRequired(input);
  const isValid = isFilled
    ? (function () {
        switch (input.id) {
          case "username":
            return checkLength(
              $username,
              MIN_CHARS_USERNAME,
              MAX_CHARS_USERNAME
            );

          case "email":
            return checkEmail($email);

          case "password":
            return checkLength(
              $password,
              MIN_CHARS_PASSWORD,
              MAX_CHARS_PASSWORD
            );

          case "password-confirm":
            return checkPasswordsMatch($password, $passwordConfirm);
        }
      })()
    : false;

  if (isFilled && isValid) {
    showSuccess(input);
    return true;
  }

  return false;
};

const resetInput = function (inputs) {
  inputs.forEach((input) => {
    input.value = "";
    input.parentElement.className = "form-group";
  });
};

$form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = [$username, $email, $password, $passwordConfirm];

  const numValidInputs = inputs.reduce(function (acc, input) {
    return checkInputValidation(input) ? acc + 1 : acc;
  }, 0);

  if (numValidInputs === NUM_INPUTS) {
    resetInput(inputs);
  }
});
