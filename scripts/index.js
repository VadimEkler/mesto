// Данные, необходимые для оперирования в следующих блоках
const profileUserNickname = document.querySelector('.profile__user-nickname');
const profileUserDescription = document.querySelector('.profile__user-description');

// Все попапы
const popup = document.querySelector('.popup');

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

  galleryItemDeleteButton.addEventListener('click', handleDelete);

  galleryItemLikeButton.addEventListener('click', handleLike);

  galleryItemImage.addEventListener('click', () => {
    popupImageCaption.textContent = galleryItemData.name;
    popupImg.src = galleryItemData.link;
    popupImageCaption.alt = galleryItemData.name;
    openPopup(popupImage);
  });

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
}

// Функция закрытия попапов
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Функция изменения имени и описания пользователя
function editUserInfo () {
  profileUserNickname.textContent = popupInputNickname.value;
  profileUserDescription.textContent = popupInputDescription.value;
};


// Отмена отправки формы на сервер, обновление данных пользователя и закрытие попапа
function handleFormSubmit (evt) {
  evt.preventDefault();
  editUserInfo();
  closePopup(popup);
};

// Сохранение информации о пользователе при сабмите формы
userInfoEditForm.addEventListener('submit', handleFormSubmit);

// Открытие попапа с инфой о пользователе при клике по иконке + автозаполенение
profileEditButton.addEventListener('click', () => {
  popupInputNickname.value = profileUserNickname.textContent;
  popupInputDescription.value = profileUserDescription.textContent;
  openPopup(popupUserInfo)
});

// Открытие попапа для добавления карточки при клике по иконке
profileAddButton.addEventListener('click', () => openPopup(popupAddImage));

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
