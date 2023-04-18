const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');

let userName = document.querySelector('.profile__user-nickname');
let userDescription = document.querySelector('.profile__user-description');
const editForm = document.querySelector('.popup__edit-form');
let inputUserName = editForm.querySelector('.popup__form-field_input_nickname');
let inputUserDescription = editForm.querySelector('.popup__form-field_input_description');

function openPopup() {
  popup.classList.add('popup_opened');
  inputUserName.setAttribute('value', `${userName.textContent}`);
  inputUserDescription.setAttribute('value', `${userDescription.textContent}`);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

function editUserInfo() {
  userName.textContent = inputUserName.value;
  userDescription.textContent = inputUserDescription.value;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  editUserInfo();
}

editForm.addEventListener('submit', handleFormSubmit);

