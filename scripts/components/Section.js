export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCardArray = items;
    this.renderer = renderer;
  }


  addItem(item) {
    this._container.prepend(item);
  }

  addCardFromInitialArray() {
    this._initialCardArray.forEach((item) => {
      this.addItem(this.renderer(item));
    })
  }
}
