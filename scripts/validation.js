const config = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__form-field_invalid'
}

function showError (inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError (inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!isInputValid) {
    showError (inputElement, errorElement, config);
  } else {
    hideError (inputElement, errorElement, config);
  }
}

function disableButton(buttonElement, config) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);


  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  [...inputList].forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      checkInputValidity(inputElement, formElement, config);
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
    });
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
  });
}

function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);
  [...formsList].forEach(function(formElement) {
    setEventListener(formElement, config);
  });
}

enableValidation(config);



