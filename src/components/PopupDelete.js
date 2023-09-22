import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._item);
    })
  }

  open = (item) => {
    super.open();
    this._item = item;
  }
}
