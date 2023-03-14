let regFormIsValid = false;
const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
const nameRegEx = /^[a-zA-Z]{3,12}$/;
const regForm = document.querySelector("#reg_form");

const formInputs = {
  firstName: document.getElementById("inputFirstName"),
  lastName: document.getElementById("inputLastName"),
  email: document.getElementById("inputEmail"),
  password: document.getElementById("inputPassword"),
  conf_password: document.getElementById("inputConfirmPassword"),
  accept_tnc: document.getElementById("accept_tnc"),
};

const placeholders = {
  firstName: document.getElementById("reg_form_firstname_hint"),
  lastName: document.getElementById("reg_form_lastname_hint"),
  email: document.getElementById("reg_form_email_hint"),
  password: document.getElementById("reg_form_password_hint"),
  conf_password: document.getElementById("reg_form_confirmpassword_hint"),
  accept_tnc: document.getElementById("reg_form_accepted_tnc_hint"),
};

function resetFormValidation() {
  // const placeholdersKeys = Object.keys(placeholders);
  // placeholdersKeys.forEach((key) => {
  //   placeholders[key].innerHTML = "";
  // });
  for (let placeholder of Array.from(Object.values(placeholders))) {
    placeholder.innerHTML = "";
  }
  const formInputKeys = Object.keys(formInputs);
  formInputKeys.forEach((key) => {
    formInputs[key].classList.remove("invalid");
    formInputs[key].classList.remove("is_valid");
  });
}

const formData = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
  conf_password: undefined,
  accept_tnc: false,
};

function handleRegistrationForm(event) {
  event.preventDefault();
  resetFormValidation();

  formData.firstName = formInputs.firstName.value.trim();
  formData.lastName = formInputs.lastName.value.trim();
  formData.email = formInputs.email.value.trim();
  formData.password = formInputs.password.value.trim();
  formData.conf_password = formInputs.conf_password.value.trim();
  formData.accept_tnc = formInputs.accept_tnc.checked;

  const formValidations = {
    firstName: nameRegEx.test(formData.firstName),
    lastName: nameRegEx.test(formData.lastName),
    email: emailRegEx.test(formData.email),
    password:
      passwordRegEx.test(formData.password) &&
      formData.password === formData.conf_password,
    accept_tnc: formData.accept_tnc,
  };

  if (!formValidations.firstName) {
    placeholders.firstName.innerHTML = "Must be 3-12 characters long";
    formInputs.firstName.classList.add("invalid");
  } else {
    formInputs.firstName.classList.add("is_valid");
  }

  if (!formValidations.lastName) {
    placeholders.lastName.innerHTML = "Must be 3-12 characters long";
    formInputs.lastName.classList.add("invalid");
  } else {
    formInputs.lastName.classList.add("is_valid");
  }

  if (!formValidations.email) {
    placeholders.email.innerHTML = "You have entered invalid email address";
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

  if (
    !formData.conf_password ||
    (formData.conf_password || "").trim().length < 6 ||
    formData.password !== formData.conf_password
  ) {
    placeholders.conf_password.innerHTML =
      "password and confirm passwords aren't matched";
    formInputs.conf_password.classList.add("invalid");
  } else {
    formInputs.conf_password.classList.add("is_valid");
  }

  if (!formValidations.accept_tnc) {
    placeholders.accept_tnc.innerHTML = "Please accept Terms & Conditions";
    formInputs.accept_tnc.classList.add("invalid");
  } else {
    formInputs.accept_tnc.classList.add("is_valid");
  }

  regFormIsValid =
    formValidations.firstName &&
    formValidations.lastName &&
    formValidations.email &&
    formValidations.password &&
    formValidations.conf_password &&
    formValidations.accept_tnc;

  if (regFormIsValid) {
    handleRegistrationFormSubmit(formData);
  }
}

function handleRegistrationFormSubmit(formData) {}

function hadleCheckBoxSelection(event) {
  formData[event.target.name] = event.target.checked;
}

regForm.addEventListener("submit", (event) => handleRegistrationForm(event));
