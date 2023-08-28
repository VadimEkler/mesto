export default class Card {
  constructor(cardData, selectorTemplate, openImagePopup) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.gallery__list-item').cloneNode(true);
  }

  _handleLike = () =>  {
    this._templateElementLikeButton.classList.toggle('gallery__like-button_active');
  }

  _handleDelete = () => {
    this._templateElement.remove();
  }

  _handleOpenImagePopup = () => {
    this._openImagePopup(this._cardData);
  }

  _addEventListeners() {
    this._templateElementLikeButton.addEventListener('click', this._handleLike);
    this._templateElementDeleteButton.addEventListener('click', this._handleDelete);
    this._templateElementImage.addEventListener('click', this._handleOpenImagePopup)
  }

  createCard() {
    this._templateElement = this._getTemplate();
    this._templateElementTitle = this._templateElement.querySelector('.gallery__title');
    this._templateElementImage = this._templateElement.querySelector('.gallery__image');
    this._templateElementLikeButton = this._templateElement.querySelector('.gallery__like-button');
    this._templateElementDeleteButton = this._templateElement.querySelector('.gallery__delete-button');

    this._templateElementImage.src = this._link;
    this._templateElementImage.alt = this._name;
    this._templateElementTitle.textContent = this._name;

    this._addEventListeners();

    return this._templateElement;
  }
}
