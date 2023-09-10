import galleryItems from "./scripts/utils/constants.js";
import FormValidator from "./scripts/components/FormValidator.js"
import Card from "./scripts/components/Card.js"
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";

const popupProfileSelector = '.popup_user-info';


const configUserInfo = {
  profileNicknameSelector: '.profile__user-nickname',
  profileDescriptionSelector: '.profile__user-description',
}

const userInfo = new UserInfo(configUserInfo);
console.log(userInfo);

const userInfoEditForm = document.querySelector('.popup__edit-form_user');
const addImageEditForm = document.querySelector('.popup__edit-form_image');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__add-btn');

// Элемент-контейнер для карточек и элемент-шаблон, с помощью которого карточки добавляем
const cardTemplateSelector = '#gallery-item';

const popupImageSelector = '.image-popup';

const popupAddImageSelector = '.popup_add-image';

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

// Открытие попапа для добавления карточки при клике по иконке
profileAddButton.addEventListener('click', () => {
  addImageEditForm.reset();
  formAddImageValidated.resetValidation();
  popupAddImage.open();
});

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValues());
  popupProfile.close();
  console.log(popupProfile.getInputValues());
});

popupProfile.setEventListeners();

const popupAddImage = new PopupWithForm(popupAddImageSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddImage.getInputValues()));
  popupAddImage.close();
});

popupAddImage.setEventListeners();

// Открытие попапа с инфой о пользователе при клике по иконке + автозаполенение
profileEditButton.addEventListener('click', () => {
  formUserInfoValidated.resetValidation();
  popupProfile.open();
  popupProfile.setInputValues(userInfo.getUserInfo());
});

formUserInfoValidated.enableValidation();
formAddImageValidated.enableValidation();
