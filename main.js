(()=>{"use strict";document.querySelector(".profile__portrait");const e=document.querySelector(".profile__edit-btn"),t=document.querySelector(".profile__add-btn"),s=document.querySelector(".profile__portrait-edit-btn"),i={inputSelector:".popup__form-field",submitButtonSelector:".popup__save-btn",inactiveButtonClass:"popup__save-btn_invalid",inputErrorClass:"popup__form-field_invalid"},r=document.querySelector(".popup__edit-form_user"),n=document.querySelector(".popup__edit-form_image"),o=document.querySelector(".popup__edit-form_avatar");class a{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._form=t,this._inputList=t.querySelectorAll(this._inputSelector),this._button=t.querySelector(this._submitButtonSelector)}_hideError(e,t){t.classList.remove(this._inputErrorClass),e.textContent=""}_showError(e,t){t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage}_disableButton(){this._button.classList.add(this._inactiveButtonClass),this._button.disabled=!0}_enableButton(){this._button.classList.remove(this._inactiveButtonClass),this._button.disabled=!1}_hasInvalidInput(){return[...this._inputList].some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this._disableButton():this._enableButton()}_checkInputValidity(e){const t=this._form.querySelector(`#${e.name}-error`);e.validity.valid?this._hideError(t,e):this._showError(t,e)}_setEventListener(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}enableValidation(){this._setEventListener(),this._toggleButtonState()}resetValidation(){this._inputList.forEach((e=>{const t=this._form.querySelector(`#${e.name}-error`);e.validity.valid||this._hideError(t,e)})),this._disableButton()}}class l{constructor(e,t,s,i,r,n){this._cardData=e,this._name=e.name,this._link=e.link,this._userId=t,this._cardId=e._id,this._ownerId=e.owner._id,this._likes=e.likes,this._selectorTemplate=s,this._handleImageClick=i,this._handleDeletePopup=r,this._changeLikeAppearance=n,this._cloneElement=document.querySelector(this._selectorTemplate).content.querySelector(".gallery__list-item").cloneNode(!0),this._cardTitle=this._cloneElement.querySelector(".gallery__title"),this._cardImage=this._cloneElement.querySelector(".gallery__image"),this._cardLikeButton=this._cloneElement.querySelector(".gallery__like-button"),this._cardDeleteButton=this._cloneElement.querySelector(".gallery__delete-button"),this._likeCounter=this._cloneElement.querySelector(".gallery__like-counter"),e.owner._id!==t&&this._cardDeleteButton.remove()}_handleLike=()=>{this._changeLikeAppearance(this._cardLikeButton,this._cardId)};_handleDelete=()=>{this._handleDeletePopup({card:this,cardId:this._cardId})};_handleCardClick=()=>{this._handleImageClick(this._cardData)};_addEventListeners(){this._cardLikeButton.addEventListener("click",this._handleLike),this._cardDeleteButton.addEventListener("click",this._handleDelete),this._cardImage.addEventListener("click",this._handleCardClick)}deleteCard(){this._cloneElement.remove(),this._cloneElement=null}createCard(){return this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardTitle.textContent=this._name,this.toggleLike(this._likes),this._addEventListeners(),this._cloneElement}isLiked(){return this._likes.some((e=>e._id===this._userId))}toggleLike(e){this._likes=e,this.isLiked()?this._cardLikeButton.classList.add("gallery__like-button_active"):this._cardLikeButton.classList.remove("gallery__like-button_active"),this._likeCounter.textContent=this._likes.length}}class c{constructor(e){this._popup=document.querySelector(e),this._popupCloseButton=this._popup.querySelector(".popup__close-btn"),this._form=this._popup.querySelector(".popup__edit-form")}_handleEscClose=e=>{"Escape"===e.key&&this.close()};_handleCloseButton=()=>{this.close()};_handleCloseOnClickOverlay=e=>{e.target===e.currentTarget&&this.close()};setEventListeners(){this._popupCloseButton.addEventListener("click",this._handleCloseButton),this._popup.addEventListener("click",this._handleCloseOnClickOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class h extends c{constructor(e,t){super(e),this._submitCallback=t,this._form=this._popup.querySelector(".popup__edit-form"),this._inputList=this._form.querySelectorAll(".popup__form-field"),this._submitButton=this._form.querySelector(".popup__save-btn"),this._initialInputValue=this._submitButton.value}_getInputValues(){return this._values={},this._inputList.forEach((e=>{this._values[e.name]=e.value})),this._values}setInputValues(e){this._inputList.forEach((t=>{t.value=e[t.name]??""}))}close(){super.close(),this._form.reset()}setupInitialInputText(){this._submitButton.value=this._initialInputValue}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._submitButton.value="Сохранение...",this._submitCallback(this._getInputValues())}))}}let _;const u=new class{constructor(e){this._profileNickname=document.querySelector(e.profileNicknameSelector),this._profileDescription=document.querySelector(e.profileDescriptionSelector),this._profileAvatar=document.querySelector(e.profileAvatarSelector)}getUserInfo(){return{nickname:this._profileNickname.textContent,description:this._profileDescription.textContent}}setUserInfo({nickname:e,description:t,avatar:s}){this._profileNickname.textContent=e,this._profileDescription.textContent=t,this._profileAvatar.src=s}}({profileNicknameSelector:".profile__user-nickname",profileDescriptionSelector:".profile__user-description",profileAvatarSelector:".profile__portrait"}),d=new class extends c{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__image"),this._popupImageCaption=this._popup.querySelector(".popup__caption")}open=e=>{super.open(),this._popupImage.src=e.link,this._popupImage.alt=e.name,this._popupImageCaption.textContent=e.name}}(".image-popup"),p=new class{constructor(e){this._url=e.baseUrl,this._headers=e.headers,this._authorization=e.headers.authorization}_checkResponse(e){return e.ok?e.json():Promise.reject}getInfo(){return fetch(`${this._url}/users/me`,{headers:{authorization:this._authorization}}).then(this._checkResponse)}getCards(){return fetch(`${this._url}/cards`,{headers:{authorization:this._authorization}}).then(this._checkResponse)}setUserInfo(e){return fetch(`${this._url}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.nickname,about:e.description})}).then(this._checkResponse)}setNewAvatar(e){return fetch(`${this._url}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then(this._checkResponse)}addCard(e){return fetch(`${this._url}/cards `,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._checkResponse)}removeCard(e){return fetch(`${this._url}/cards/${e}`,{method:"DELETE",headers:{authorization:this._authorization}}).then(this._checkResponse)}addLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"PUT",headers:{authorization:this._authorization}}).then(this._checkResponse)}removeLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"DELETE",headers:{authorization:this._authorization}}).then(this._checkResponse)}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-75",headers:{authorization:"2b612430-bf53-4842-8fac-4e392ff44657","Content-Type":"application/json"}}),m=new class extends c{constructor(e,t){super(e),this._submitCallback=t}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._submitCallback({card:this._card,cardId:this._cardId}),console.log(this._card,this._cardId)}))}open=({card:e,cardId:t})=>{super.open(),this._card=e,this._cardId=t}}(".popup_delete",(({card:e,cardId:t})=>{p.removeCard(t).then((()=>{e.deleteCard(),m.close()})).catch((e=>console.error(`Ошибка при удалении карточки ${e}`)))}));function v(e){const t=new l(e,_,"#gallery-item",d.open,m.open,((e,s)=>{e.classList.contains("gallery__like-button_active")?p.removeLike(s).then((e=>{t.toggleLike(e.likes)})).catch((e=>console.error(`Не удалось снять лайк. Ошибка:${e}`))):p.addLike(s).then((e=>{t.toggleLike(e.likes)})).catch((e=>console.error(`Не удалось поставить лайк. Ошибка:${e}`)))}));return t.createCard()}const k=new class{constructor(e,t){this._container=document.querySelector(t),this._renderer=e}addItem(e){this._container.prepend(e)}addCardFromInitialArray(e){e.forEach((e=>{this._renderer(e)}))}}((e=>{k.addItem(v(e))}),".gallery__list"),f=new h(".popup_user-info",(e=>{p.setUserInfo(e).then((e=>{u.setUserInfo({nickname:e.name,description:e.about,avatar:e.avatar}),f.close()})).catch((e=>console.error(`Ошибка при редактировании профиля ${e}`))).finally((()=>f.setupInitialInputText())),u.setUserInfo(e)})),L=new h(".popup_add-image",(e=>{p.addCard(e).then((e=>{k.addItem(v(e)),L.close()})).catch((e=>console.error(`Ошибка при добавлении карточки ${e}`))).finally((()=>L.setupInitialInputText()))})),y=new h(".popup_edit-avatar",(e=>{p.setNewAvatar(e).then((e=>{u.setUserInfo({nickname:e.name,description:e.about,avatar:e.avatar}),y.close()})).catch((e=>console.error(`Ошибка при обновлении автара профиля ${e}`))).finally((()=>y.setupInitialInputText()))})),E=new a(i,r),I=new a(i,n),g=new a(i,o);e.addEventListener("click",(()=>{E.resetValidation(),f.open(),f.setInputValues(u.getUserInfo())})),t.addEventListener("click",(()=>{I.resetValidation(),L.open()})),s.addEventListener("click",(()=>{g.resetValidation(),y.open()})),d.setEventListeners(),f.setEventListeners(),L.setEventListeners(),y.setEventListeners(),m.setEventListeners(),E.enableValidation(),I.enableValidation(),g.enableValidation(),Promise.all([p.getInfo(),p.getCards()]).then((([e,t])=>{u.setUserInfo({nickname:e.name,description:e.about,avatar:e.avatar}),_=e._id,k.addCardFromInitialArray(t.reverse())})).catch((e=>console.error(`Ошибка при загрузке начальных данных страницы ${e}`)))})();