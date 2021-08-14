import { createElement } from './utils.js';

const createFooterStatisticsMessage = () => '<p>0 movies inside</p>';

export default class FooterStatisticsMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsMessage();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
