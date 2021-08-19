import Abstract from './abstract.js';


// Создает меню

const createMenuTemplate = (statisticsData) =>
  `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${statisticsData.inWatchlistCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${statisticsData.inHistoryCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${statisticsData.inFavoritesCount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

export default class SiteMenu extends Abstract {
  constructor(statisticsData) {
    super();
    this._statisticsData = statisticsData;
  }

  getTemplate() {
    return createMenuTemplate(this._statisticsData);
  }
}

