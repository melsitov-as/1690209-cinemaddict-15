import Abstract from './abstract.js';

// Создает фильтры
const createMenuFilters = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;


// Класс Меню фильтры
export default class SiteMenuFilters extends Abstract {
  getTemplate() {
    return createMenuFilters();
  }
}
