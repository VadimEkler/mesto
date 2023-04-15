let openPopupBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-btn');

let userName = document.querySelector('.profile__user-nickname');
let userDescription = document.querySelector('.profile__user-description');
let editForm = document.querySelector('.popup__edit-form');
let inputUserName = document.querySelector('.popup__form-field_nickcame');
let inputUserDescription = document.querySelector('.popup__form-field_description');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

openPopupBtn.addEventListener('click', togglePopup);
closePopupBtn.addEventListener('click', togglePopup);

function selectPlaceholder() {
  let popupContent = popup.querySelector('.popup__content');
  let popupEditForm = popupContent.querySelector('.popup__edit-form');
  let popupPlaceholderName = popupEditForm.querySelector('.popup__form-field_nickcame');
  let popupPlaceholderDescription = popupEditForm.querySelector('.popup__form-field_description');

  popupPlaceholderName.setAttribute('placeholder',`${userName.textContent}`);
  popupPlaceholderDescription.setAttribute('placeholder',`${userDescription.textContent}`);
}

selectPlaceholder();


function editUserName() {
  userName.textContent = (`
  ${inputUserName.value}
  `);
}


function editUserDescription() {
  userDescription.textContent = (`
  ${inputUserDescription.value}
  `);
}

function handleFormSubmit (evt) {
  evt.preventDefault();
}

editForm.addEventListener('submit', handleFormSubmit);
editForm.addEventListener('submit', editUserName);
editForm.addEventListener('submit', editUserDescription);
