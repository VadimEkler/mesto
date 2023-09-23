import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__edit-form');
    this._inputList = this._form.querySelectorAll('.popup__form-field');
    this._submitButton = this._form.querySelector('.popup__save-btn');
    this._initialInputValue = this._submitButton.value;
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    });

    return this._values;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name] ?? '';
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setupInitialInputText() {
    this._submitButton.value = this._initialInputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.value = `Сохранение...`;
      this._submitCallback(this._getInputValues())})
  }
}
