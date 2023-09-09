export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-btn');
  }

  _handleClosePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleCloseButton = () => {
    this.closePopup();
  }

  _handleClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._handleCloseButton);
    this._popup.addEventListener('click', this._handleClickOverlay);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleClosePopupEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleClosePopupEsc);
  }
}
