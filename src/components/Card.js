export default class Card {
  constructor(data, selectorTemplate, handleImageClick, handleDeletePopup, changeLikeAppearance) {
    this._cardData = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._selectorTemplate = selectorTemplate;
    this._handleImageClick = handleImageClick;
    this._handleDeletePopup = handleDeletePopup;
    this._changeLikeAppearance = changeLikeAppearance;
    this._cloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.gallery__list-item').cloneNode(true);
    this._cardTitle = this._cloneElement.querySelector('.gallery__title');
    this._cardImage = this._cloneElement.querySelector('.gallery__image');
    this._cardLikeButton = this._cloneElement.querySelector('.gallery__like-button');
    this._cardDeleteButton = this._cloneElement.querySelector('.gallery__delete-button');
    this._likeCounter = this._cloneElement.querySelector('.gallery__like-counter')
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

  _checkDeleteIconVisibility() {
    this._myId === this._ownerId ?
    this._cardDeleteButton.style.display = 'block' :
    this._cardDeleteButton.style.display = 'none';
  }

  _checkLikeStatus() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._cardLikeButton.classList.add('gallery__like-button_active')
        return
      }
    })
    this._likeCounter.textContent = this._likesLength;
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

    this._checkLikeStatus();
    this._checkDeleteIconVisibility();
    this._addEventListeners();

    return this._cloneElement;
  }

  toggleLike(likes) {
    this._cardLikeButton.classList.toggle('gallery__like-button_active');
    this._likeCounter.textContent = likes.length;
  }
}
