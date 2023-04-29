const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');

let userName = document.querySelector('.profile__user-nickname');
let userDescription = document.querySelector('.profile__user-description');
const editForm = document.querySelector('.popup__edit-form');
let inputUserName = editForm.querySelector('.popup__form-field_input_nickname');
let inputUserDescription = editForm.querySelector('.popup__form-field_input_description');

function openPopup() {
  popup.classList.add('popup_opened');
  inputUserName.setAttribute('value', `${userName.textContent}`);
  inputUserDescription.setAttribute('value', `${userDescription.textContent}`);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

function editUserInfo() {
  userName.textContent = inputUserName.value;
  userDescription.textContent = inputUserDescription.value;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  editUserInfo();
  closePopup();
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

  galleryItemTitle.textContent = galleryItemData.name;
  galleryItemImage.src = galleryItemData.link;
  galleryItemImage.alt = galleryItemData.name;

  return galleryItem;
};

galleryItems.forEach((item) => {
  const element = createGalleryItem(item);

  galleryContainer.appendChild(element);
});

