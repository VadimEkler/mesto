export default class Card {
  constructor(data, userId, selectorTemplate, handleImageClick, handleDeletePopup, changeLikeAppearance) {
    this._cardData = data;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._selectorTemplate = selectorTemplate;
    this._handleImageClick = handleImageClick;
    this._handleDeletePopup = handleDeletePopup;
    this._changeLikeAppearance = changeLikeAppearance;
    this._cloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.gallery__list-item').cloneNode(true);
    this._cardTitle = this._cloneElement.querySelector('.gallery__title');
    this._cardImage = this._cloneElement.querySelector('.gallery__image');
    this._cardLikeButton = this._cloneElement.querySelector('.gallery__like-button');
    this._cardDeleteButton = this._cloneElement.querySelector('.gallery__delete-button');
    this._likeCounter = this._cloneElement.querySelector('.gallery__like-counter');

    if (data.owner._id !== userId) {
      this._cardDeleteButton.remove();
    }
  }

  _handleLike = () =>  {
    this._changeLikeAppearance(this._cardLikeButton, this._cardId)
  }

  _handleDelete = () => {
    this._handleDeletePopup({ card: this, cardId: this._cardId });
  }

  _handleCardClick = () => {
    this._handleImageClick(this._cardData);
  }

  _addEventListeners() {
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardDeleteButton.addEventListener('click', this._handleDelete);
    this._cardImage.addEventListener('click', this._handleCardClick)
  }

  deleteCard() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  createCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.toggleLike(this._likes);
    this._addEventListeners();

    return this._cloneElement;
  }

  isLiked() {
    return this._likes.some(item => item._id === this._userId);
  }

  toggleLike(likes) {
    this._likes = likes;
    if (this.isLiked()) {
      this._cardLikeButton.classList.add('gallery__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('gallery__like-button_active');
    }
    this._likeCounter.textContent = this._likes.length;
  }
}
