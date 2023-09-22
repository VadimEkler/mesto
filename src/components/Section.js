export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCardArray = items;
    this._renderer = renderer;
  }


  addItem(itemDOM) {
    this._container.prepend(itemDOM);
  }

  addCardFromInitialArray() {
    this._initialCardArray.forEach((item) => {
      this._renderer(item);
    })
  }
}
