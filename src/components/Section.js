export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCardArray = items;
    this._renderer = renderer;
  }


  addItem(data) {
    this._container.prepend(this._renderer(data));
  }

  addCardFromInitialArray() {
    this._initialCardArray.forEach((item) => {
      this.addItem(item);
    })
  }
}
