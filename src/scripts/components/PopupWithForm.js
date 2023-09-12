import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__edit-form') ;
    this._inputList = this._form.querySelectorAll('.popup__form-field');
  }


  // Делаю метод публичным, так как он используется для получения значений из инпутов

  getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    });

    return this._values;
  }

  setInputValues(user) {
    this._inputList.forEach(input => {
      input.value = user[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitCallback)
  }
}
