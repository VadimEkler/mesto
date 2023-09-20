// import './index.css';
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
  newAvatarEditForm,
  configUserInfo
} from '../utils/constants.js'
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

const userInfo = new UserInfo(configUserInfo);

const imagePopup = new PopupWithImage(popupImageSelector);

const section = new Section({
  items: galleryItems,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, imagePopup.open);
    return card.createCard();
  }
}, galleryItemsSelector)

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});

const popupAddImage = new PopupWithForm(popupAddImageSelector, (data) => {
  section.addItem(data);
  popupAddImage.close();
});

const formUserInfoValidated = new FormValidator(validationConfig, userInfoEditForm);
const formAddImageValidated = new FormValidator(validationConfig, addImageEditForm);
const formNewAvatarValidated = new FormValidator(validationConfig, newAvatarEditForm);

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
formNewAvatarValidated.enableValidation();


