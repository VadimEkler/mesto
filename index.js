import galleryItems from "./scripts/utils/constants.js";
import FormValidator from "./scripts/components/FormValidator.js"
import Card from "./scripts/components/Card.js"
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";

const configUserInfo = {
  profileNicknameSelector: '.profile__user-nickname',
  profileDescriptionSelector: '.profile__user-description',
}

const userInfo = new UserInfo(configUserInfo);
console.log(userInfo);

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

// Элемент-контейнер для карточек и элемент-шаблон, с помощью которого карточки добавляем
const galleryContainer = document.querySelector('.gallery__list');
const cardTemplateSelector = '#gallery-item';

const popupProfileSelector = '.popup_user-info';

const popupImageSelector = '.image-popup';

const galleryItemsSelector = '.gallery__list';

const validationConfig = {
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__form-field_invalid',
}

const formUserInfoValidated = new FormValidator(validationConfig, userInfoEditForm);
const formAddImageValidated = new FormValidator(validationConfig, addImageEditForm);

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const section = new Section({
  items: galleryItems,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, imagePopup.open);
    return card.createCard();
  }
}, galleryItemsSelector)

section.addCardFromInitialArray();

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
  formUserInfoValidated.resetValidation();
  popupInputNickname.value = profileUserNickname.textContent;
  popupInputDescription.value = profileUserDescription.textContent;
  popupProfile.open();
  // openPopup(popupUserInfo);
});

// Открытие попапа для добавления карточки при клике по иконке
profileAddButton.addEventListener('click', () => {
  // openPopup(popupAddImage);
  addImageEditForm.reset();
  formAddImageValidated.resetValidation();
});

// Добавление новой карточки при сабмите формы
popupAddImage.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const galleryItemNew = {name: popupInputTitle.value, link: popupInputLink.value};
  addCard(galleryContainer, createNewCard(galleryItemNew));
  // closePopup(popupAddImage);
  evt.target.reset();
});

formUserInfoValidated.enableValidation();
formAddImageValidated.enableValidation();
