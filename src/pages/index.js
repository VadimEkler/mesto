// разместил файл index.js не в директории pages, а в src для корректной работы вебпака

import {
  galleryItems,
  popupProfileSelector,
  cardTemplateSelector,
  popupImageSelector,
  popupAddImageSelector,
  galleryItemsSelector,
  profileEditButton,
  profileAddButton,
  validationConfig,
  userInfoEditForm,
  addImageEditForm,
  configUserInfo
} from '../scripts/utils/constants.js'
import FormValidator from "../scripts/components/FormValidator.js"
import Card from "../scripts/components/Card.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";

const userInfo = new UserInfo(configUserInfo);

const imagePopup = new PopupWithImage(popupImageSelector);

const section = new Section({
  items: galleryItems,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, imagePopup.open);
    return card.createCard();
  }
}, galleryItemsSelector)

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValues());
  popupProfile.close();
});

const popupAddImage = new PopupWithForm(popupAddImageSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddImage.getInputValues()));
  popupAddImage.close();
});

const formUserInfoValidated = new FormValidator(validationConfig, userInfoEditForm);
const formAddImageValidated = new FormValidator(validationConfig, addImageEditForm);

profileEditButton.addEventListener('click', () => {
  formUserInfoValidated.resetValidation();
  popupProfile.open();
  popupProfile.setInputValues(userInfo.getUserInfo());
});

profileAddButton.addEventListener('click', () => {
  formAddImageValidated.resetValidation();
  popupAddImage.open();
});

section.addCardFromInitialArray();

imagePopup.setEventListeners();
popupProfile.setEventListeners();
popupAddImage.setEventListeners();

formUserInfoValidated.enableValidation();
formAddImageValidated.enableValidation();
