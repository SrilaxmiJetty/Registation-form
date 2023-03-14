let formIsValid = false;
const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
const formInputs = {
  email: document.getElementById("input_email"),
  password: document.getElementById("input_password"),
};

const placeholders = {
  email: document.getElementById("form_email_hint"),
  password: document.getElementById("form_password_hint"),
};

const resetValidations = () => {
  const placeholderKeys = Object.keys(placeholders);
  placeholderKeys.forEach((key) => {
    placeholders[key].innerHTML = "";
  });
  const formInputKeys = Object.keys(formInputs);
  formInputKeys.forEach((key) => {
    formInputs[key].classList.remove("invalid");
    formInputs[key].classList.remove("is_valid");
  });
};

const formData = {
  email: undefined,
  password: undefined,
};

const handleFormData = (event) => {
  event.preventDefault();
  resetValidations();

  formData.email = formInputs.email.value.trim();
  formData.password = formInputs.password.value.trim();

  const formValidations = {
    email: emailRegEx.test(formData.email),
    password: passwordRegEx.test(formData.password),
  };
  if (!formValidations.email) {
    placeholders.email.innerHTML = "You have entered an invalid email address";
    formInputs.email.classList.add("invalid");
  } else {
    formInputs.email.classList.add("is_valid");
  }

  if (!passwordRegEx.test(formData.password)) {
    placeholders.password.innerHTML =
      "Minimum six characters, at least one letter and one number";
    formInputs.password.classList.add("invalid");
  } else {
    formInputs.password.classList.add("is_valid");
  }
  formIsValid = formValidations.email && formValidations.password;

  if (formIsValid) {
    handleFormSubmission(formData);
  }
};

const handleFormSubmission = (formData) => {
  console.log({ formData });
};
