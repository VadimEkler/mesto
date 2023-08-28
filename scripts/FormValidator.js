export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._inputList = form.querySelectorAll(this._inputSelector);
    this._button = form.querySelector(this._submitButtonSelector);
  }

  _hideError(errorElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _showError(errorElement, input) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disable = true;
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disable = false;
  }

  _getInvalidInput() {
    return [...this._inputList].some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    this._getInvalidInput() ? this._disableButton(this._button) : this._enableButton(this._button);
  }

  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`#${input.name}-error`);
    console.log(errorElement);
    input.validity.valid ? this._hideError(errorElement, input) : this._showError(errorElement, input);
  }

  _setEventListener() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListener();
    console.log(FormValidator);
  }
}
