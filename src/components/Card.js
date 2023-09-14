export default class Card {
  constructor(data, selectorTemplate, handleImageClick) {
    this._cardData = data;
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplate = selectorTemplate;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.gallery__list-item').cloneNode(true);
  }

  _handleLike = () =>  {
    this._cardLikeButton.classList.toggle('gallery__like-button_active');
  }

  _handleDelete = () => {
    this._card.remove();
    this._card = null;
  }

  _handleCardClick = () => {
    this._handleImageClick(this._cardData);
  }

  _addEventListeners() {
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardDeleteButton.addEventListener('click', this._handleDelete);
    this._cardImage.addEventListener('click', this._handleCardClick)
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardTitle = this._card.querySelector('.gallery__title');
    this._cardImage = this._card.querySelector('.gallery__image');
    this._cardLikeButton = this._card.querySelector('.gallery__like-button');
    this._cardDeleteButton = this._card.querySelector('.gallery__delete-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._addEventListeners();

    return this._card;
  }
}
