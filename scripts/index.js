import galleryItems from "./cards.js";
import FormValidator from "./FormValidator.js"
import Card from "./Card.js";

// Данные, необходимые для оперирования в следующих блоках
const profileUserNickname = document.querySelector('.profile__user-nickname');
const profileUserDescription = document.querySelector('.profile__user-description');

const popupsList = document.querySelectorAll('.popup');

// Элементы попапа с информацией о пользователе
const popupUserInfo = document.querySelector('.popup_user-info');
const popupInputNickname = popupUserInfo.querySelector('.popup__form-field_input_nickname');
const popupInputDescription = popupUserInfo.querySelector('.popup__form-field_input_description');
const userInfoEditForm = document.querySelector('.popup__edit-form_user');

// Элементы попапа с информацией о новой карточке
const popupAddImage = document.querySelector('.popup_add-image');
const popupInputTitle = popupAddImage.querySelector('.popup__form-field_input_title');
const popupInputLink = popupAddImage.querySelector('.popup__form-field_input_link');
const addImageEditForm = document.querySelector('.popup__edit-form_image');

// Элементы попапа для картинки
const popupImage = document.querySelector('.image-popup');
const popupImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__add-btn');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

function openImagePopup(galleryItemData) {
  popupImageCaption.textContent = galleryItemData.name;
  popupImg.src = galleryItemData.link;
  popupImageCaption.alt = galleryItemData.name;
  openPopup(popupImage);
};

// Элемент-контейнер для карточек и элемент-шаблон, с помощью которого карточки добавляем
const galleryContainer = document.querySelector('.gallery__list');
const selectorTemplate = '#gallery-item';

const createNewCard = (item) => {
  const card = new Card(item, selectorTemplate, openImagePopup);
  const cardTemplate = card.createCard();
  return cardTemplate;
}

function addCard(galleryContainer, card) {
  galleryContainer.prepend(card);
}

galleryItems.forEach((item) => {
  addCard(galleryContainer, createNewCard(item));
});

// Функция открытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Функция закрытия попапов
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}


// Функция изменения имени и описания пользователя
function editUserInfo () {
  profileUserNickname.textContent = popupInputNickname.value;
  profileUserDescription.textContent = popupInputDescription.value;
};


// Отмена отправки формы на сервер, обновление данных пользователя и закрытие попапа
function handleUserInfoFormSubmit (evt) {
  evt.preventDefault();
  editUserInfo();
  closePopup(popupUserInfo);
};

// Сохранение информации о пользователе при сабмите формы
userInfoEditForm.addEventListener('submit', handleUserInfoFormSubmit);

// Открытие попапа с инфой о пользователе при клике по иконке + автозаполенение
profileEditButton.addEventListener('click', () => {
  popupInputNickname.value = profileUserNickname.textContent;
  popupInputDescription.value = profileUserDescription.textContent;
  openPopup(popupUserInfo);
});

// Открытие попапа для добавления карточки при клике по иконке
profileAddButton.addEventListener('click', () => {
  openPopup(popupAddImage);
});

// Добавление новой карточки при сабмите формы
popupAddImage.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const galleryItemNew = {name: popupInputTitle.value, link: popupInputLink.value};
  addCard(galleryContainer, createNewCard(galleryItemNew));
  closePopup(popupAddImage);
  evt.target.reset();
});


// Закрытие попапов при клике по иконке
popupCloseButtons.forEach ((element) => {
  const closestPopup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(closestPopup));
});

// Вешаем слушатели на все попапы для закрытия по оверлей
popupsList.forEach ((element) => {
  element.addEventListener('click', (evt) => {
    closePopupOverlay(evt);
  })
})

// Функция закрытия попапа при клике на оверлей
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget){
    closePopup(evt.target);
  }
}

// Функция закрытия попапа при нажатии esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

const config = {
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__form-field_invalid',
}

const formUserInfoValidated = new FormValidator(config, userInfoEditForm);
const formAddImageValidated = new FormValidator(config, addImageEditForm);
formUserInfoValidated.enableValidation();
formAddImageValidated.enableValidation();
