// import './index.css';
import {
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
} from '../utils/constants.js'
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDelete from '../components/PopupDelete.js';
import Api from '../components/Api.js';

const userInfo = new UserInfo(configUserInfo);

const imagePopup = new PopupWithImage(popupImageSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '2b612430-bf53-4842-8fac-4e392ff44657',
    'Content-Type': 'application/json'
  }
});

const popupDelete = new PopupDelete(popupDeleteSelector, (item) => {
  item.deleteCard();
  popupDelete.close();
})

function createNewCard(item) {
  const card = new Card(item,
    cardTemplateSelector,
    imagePopup.open,
    popupDelete.open,
    (cardLikeButton, cardId) => {
      if (cardLikeButton.classList.contains('gallery__like-button_active')) {
        api.removeLike(cardId)
          .then(res => {
            card.toggleLike(res.likes)
          })
          .catch(error => console.error(`Не удалось снять лайк. Ошибка:${error}`))
      } else {
        api.addLike(cardId)
          .then(res => {
            card.toggleLike(res.likes)
          })
          .catch(error => console.error(`Не удалось поставить лайк. Ошибка:${error}`))
      }
  });
  return card.createCard();
}

const section = new Section((item) => {
  section.addItem(createNewCard(item))
}, galleryItemsSelector)

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({
        nickname: res.name,
        description: res.about,
        avatar: res.avatar,
      })
    })
    .catch((error => console.error(`Ошибка при редактировании профиля ${error}`)))
    .finally();
  userInfo.setUserInfo(data);
  popupProfile.close();
});

const popupAddImage = new PopupWithForm(popupAddImageSelector, (data) => {
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myId = dataUser._id;
      section.addItem(createNewCard(dataCard))
      popupAddImage.close()
    })
    .catch((error => console.error(`Ошибка при добавлении карточки ${error}`)))
    .finally()
});

const popupAvatarEdit = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setNewAvatar(data)
    .then(res => {
      userInfo.setUserInfo({
        nickname: res.name,
        description: res.about,
        avatar: res.avatar,
      })
    })
    .catch((error => console.error(`Ошибка при обновлении автара профиля ${error}`)))
    .finally();
  popupAvatarEdit.close();
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

profileAvatarEditButton.addEventListener('click', () => {
  formNewAvatarValidated.resetValidation();
  popupAvatarEdit.open();
});

imagePopup.setEventListeners();
popupProfile.setEventListeners();
popupAddImage.setEventListeners();
popupAvatarEdit.setEventListeners();
popupDelete.setEventListeners();

formUserInfoValidated.enableValidation();
formAddImageValidated.enableValidation();
formNewAvatarValidated.enableValidation();

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => {
      element.myId = dataUser._id;
    })
    userInfo.setUserInfo({
      nickname: dataUser.name,
      description: dataUser.about,
      avatar: dataUser.avatar,
    })
    section.addCardFromInitialArray(dataCard);
  })
  .catch(error => console.error(`Ошибка при загрузке начальных данных страницы ${error}`));
