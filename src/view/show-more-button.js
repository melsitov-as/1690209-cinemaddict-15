import Abstract from './abstract.js';

// Создает кнопку "Show more"
const createShowMoreButton = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class SiteShowMoreButton extends Abstract {
  constructor() {
    super();
    this._showMoreHandler = this._showMoreHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButton();
  }

  // Это приватный метод, который будет являться обработчиком события он будет вызываться и в нем будут выполняться какие-то действия
  // а затем будет выполнятся колбэк
  _showMoreHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setShowMoreHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._showMoreHandler);
  }
}
