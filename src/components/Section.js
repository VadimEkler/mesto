export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }


  addItem(itemDOM) {
    this._container.prepend(itemDOM);
  }

  addCardFromInitialArray(dataCard) {
    dataCard.forEach((item) => {
      this._renderer(item);
    })
  }
}
