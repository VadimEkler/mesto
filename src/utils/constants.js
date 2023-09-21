// Первичный массив элементов
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

// Селекторы для создания экземпляров классов
const popupProfileSelector = '.popup_user-info';
const cardTemplateSelector = '#gallery-item';
const popupImageSelector = '.image-popup';
const popupAddImageSelector = '.popup_add-image';
const popupAvatarSelector = '.popup_avatar';
const popupDeleteSelector = '.popup_delete';
const galleryItemsSelector = '.gallery__list';

// Селектор изображения для аватарки
const popupImageAvatar = document.querySelector('.profile__portrait');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__add-btn');
const profileAvatarEditButton = document.querySelector('.profile__portrait-btn');

// Объект конфига для валидации
const validationConfig = {
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__form-field_invalid',
}

// Константы форм для валидации
const userInfoEditForm = document.querySelector('.popup__edit-form_user');
const addImageEditForm = document.querySelector('.popup__edit-form_image');
const newAvatarEditForm = document.querySelector('.popup__edit-form_avatar');

// Объект с информацией об объекте пользователя
const configUserInfo = {
  profileNicknameSelector: '.profile__user-nickname',
  profileDescriptionSelector: '.profile__user-description',
}

export {
  galleryItems,
  popupProfileSelector,
  cardTemplateSelector,
  popupImageSelector,
  popupAddImageSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  galleryItemsSelector,
  popupImageAvatar,
  profileEditButton,
  profileAddButton,
  profileAvatarEditButton,
  validationConfig,
  userInfoEditForm,
  addImageEditForm,
  newAvatarEditForm,
  configUserInfo
}
