const popup = document.querySelector('.popup');
const popupUserInfo = document.querySelector('.popup_user-info');
const popupAddImage = document.querySelector('.popup_add-image');

const openPopupBtnUserInfo = document.querySelector('.profile__edit-btn');
const openPopupBtnAddImage = document.querySelector('.profile__add-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
const editForm = document.querySelector('.popup__edit-form');

let userName = document.querySelector('.profile__user-nickname');
let userDescription = document.querySelector('.profile__user-description');
let inputUserName = editForm.querySelector('.popup__form-field_input_nickname');
let inputUserDescription = editForm.querySelector('.popup__form-field_input_description');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  inputUserName.setAttribute('value', `${userName.textContent}`);
  inputUserDescription.setAttribute('value', `${userDescription.textContent}`);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

openPopupBtnUserInfo.addEventListener('click', function () {
  openPopup(popupUserInfo);
});

openPopupBtnAddImage.addEventListener('click', function () {
  openPopup(popupAddImage);
});

closePopupBtn.addEventListener('click', function () {
  closePopup(popup);
});

function editUserInfo() {
  userName.textContent = inputUserName.value;
  userDescription.textContent = inputUserDescription.value;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  editUserInfo();
  closePopup(popup);
}

editForm.addEventListener('submit', handleFormSubmit);

const galleryItems = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const galleryItemTemplate = document.getElementById('gallery-item');
const galleryContainer = document.querySelector('.gallery__list');

const createGalleryItem = (galleryItemData) => {
  const galleryItem = galleryItemTemplate.content.querySelector('.gallery__list-item').cloneNode(true);
  const galleryItemTitle = galleryItem.querySelector('.gallery__title');
  const galleryItemImage = galleryItem.querySelector('.gallery__image');
  const galleryItemLikeBtn = galleryItem.querySelector('.gallery__like-button');

  galleryItemTitle.textContent = galleryItemData.name;
  galleryItemImage.src = galleryItemData.link;
  galleryItemImage.alt = galleryItemData.name;

  const handleLike = () => {
    galleryItemLikeBtn.classList.toggle('gallery__like-button_active');
  };

  galleryItemLikeBtn.addEventListener('click', handleLike)

  return galleryItem;
};

galleryItems.forEach((item) => {
  const element = createGalleryItem(item);

  galleryContainer.appendChild(element);
});

