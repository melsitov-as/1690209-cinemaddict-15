import Abstract from './abstract.js';

// Создает кнопку "Show more"
const createShowMoreButton = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class SiteShowMoreButton extends Abstract {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButton();
  }

  // Это приватный метод, который будет являться обработчиком события он будет вызываться и в нем будут выполняться какие-то действия
  // а затем будет выполнятся колбэк
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
