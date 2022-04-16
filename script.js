//////////////////////////////////////////////////////////////
// SELECTORS
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//////////////////////////////////////////////////////////////
// HELPER FUNCTIONS

// Show input error message
const showError = (input, message) => {
  const formControl = input.closest(".form-control");
  if (!formControl) return;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.textContent = message;
};

// Show input success message
const showSuccess = (input) => {
  const formControl = input.closest(".form-control");
  if (!formControl) return;
  formControl.className = "form-control success";
};

// Check email valid
const checkEmail = (input) => {
  const value = input.value.trim();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(String(value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check require fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
};

// Check length
const checkLength = (input, min, max) => {
  if (input.value.trim().length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.trim().length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check password match
const checkPasswordMatch = (input1, input2) => {
  if (input2.value === "") {
    showError(input2, `Please confirm your password`);
    return;
  }
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  } else {
    showSuccess(input2);
  }
};

////////////////////////////////////////////////////////////////
//  EVENT LISTENERS
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 3, 15);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
