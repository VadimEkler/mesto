// Данные, необходимые для оперирования в следующих блоках
const profileUserNickname = document.querySelector('.profile__user-nickname');
const profileUserDescription = document.querySelector('.profile__user-description');

const popupsList = document.querySelectorAll('.popup');
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');

// Элементы попапа с информацией о пользователе
const popupUserInfo = document.querySelector('.popup_user-info');
const popupInputNickname = popupUserInfo.querySelector('.popup__form-field_input_nickname');
const popupInputDescription = popupUserInfo.querySelector('.popup__form-field_input_description');
const userInfoEditForm = popupUserInfo.querySelector('.popup__edit-form');

// Элементы попапа с информацией о новой карточке
const popupAddImage = document.querySelector('.popup_add-image');
const popupInputTitle = popupAddImage.querySelector('.popup__form-field_input_title');
const popupInputLink = popupAddImage.querySelector('.popup__form-field_input_link');

// Элементы попапа для картинки
const popupImage = document.querySelector('.image-popup');
const popupImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__add-btn');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const popupSaveBtnNewCardData = document.querySelector('.popup__save-btn_new-card-data')

// Элемент-контейнер для карточек и элемент-шаблон, с помощью которого карточки добавляем
const galleryContainer = document.querySelector('.gallery__list');
const galleryItemTemplate = document.querySelector('#gallery-item');

// Создание карточки на основе данных, прилетающих из массива
const createGalleryItem = (galleryItemData) => {
  const galleryItem = galleryItemTemplate.content.querySelector('.gallery__list-item').cloneNode(true);
  const galleryItemTitle = galleryItem.querySelector('.gallery__title');
  const galleryItemImage = galleryItem.querySelector('.gallery__image');
  const galleryItemDeleteButton = galleryItem.querySelector('.gallery__delete-button');
  const galleryItemLikeButton = galleryItem.querySelector('.gallery__like-button');

  galleryItemTitle.textContent = galleryItemData.name;
  galleryItemImage.src = galleryItemData.link;
  galleryItemImage.alt = galleryItemData.name;

  const handleDelete = () => {
    galleryItem.remove();
  };

  const handleLike = () => {
    galleryItemLikeButton.classList.toggle('gallery__like-button_active');
  };

  function openImagePopup () {
    popupImageCaption.textContent = galleryItemData.name;
    popupImg.src = galleryItemData.link;
    popupImageCaption.alt = galleryItemData.name;
    openPopup(popupImage);
  };

  galleryItemDeleteButton.addEventListener('click', handleDelete);

  galleryItemLikeButton.addEventListener('click', handleLike);

  galleryItemImage.addEventListener('click', openImagePopup);

  return galleryItem;
};

// Добавление каждой карточки из первичного массива в галерею
galleryItems.forEach((item) => {
  const element = createGalleryItem(item);

  galleryContainer.appendChild(element);
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
  // resetErrorMessage(userInfoEditForm, config);
  popupInputNickname.value = profileUserNickname.textContent;
  popupInputDescription.value = profileUserDescription.textContent;
  openPopup(popupUserInfo);
});

// Открытие попапа для добавления карточки при клике по иконке
profileAddButton.addEventListener('click', () => {
  disableButton(popupSaveBtnNewCardData, config)
  openPopup(popupAddImage);
});

// Добавление новой карточки при сабмите формы
popupAddImage.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const galleryItemNew = {name: popupInputTitle.value, link: popupInputLink.value};
  galleryContainer.prepend(createGalleryItem(galleryItemNew));
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


