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
      this._submitCallback({card: this._card, _cardId: this._cardId});
      console.log(this._card, this._cardId)
    })
  }

  open = ({ card, cardId }) => {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
}
