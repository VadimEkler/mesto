export default class UserInfo {
  constructor(configUserInfo) {
    this._profileNickname = document.querySelector(configUserInfo.profileNicknameSelector);
    this._profileDescription = document.querySelector(configUserInfo.profileDescriptionSelector);
  }

  getUserInfo() {
    return {
      nickname: this._profileNickname.textContent,
      description: this._profileDescription.textContent,
    }
  }

  setUserInfo({nickname, description}) {
    this._profileNickname.textContent = nickname;
    this._profileDescription.textContent = description;
  }
}
