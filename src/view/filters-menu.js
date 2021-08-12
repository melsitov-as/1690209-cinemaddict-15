import { createElement } from "./utils.js";

// Создает фильтры
const createMenuFilters = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;


  // Класс Меню фильтры
  export default class SiteMenuFilters {
    constructor() {
      this._element = null;
    }

    getTemplate() {
      return createMenuFilters();
    }

    getElement() {
      if (!this.element) {
        this._element = createElement(this.getTemplate());
      }

      return this._element;
    }

    removeElement() {
      this._element = null;
    }
  }
