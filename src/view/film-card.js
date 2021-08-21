import { getDuration } from '../utils/common.js';
import Abstract from './abstract.js';

// Создает карточку фильма
const createFilmCard = (filmCardData) => {
  const durationInHM = getDuration(filmCardData.totalDuration);
  return `<article class="film-card">
    <h3 class="film-card__title">${filmCardData.title}</h3>
    <p class="film-card__rating">${filmCardData.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmCardData.year}</span>
      <span class="film-card__duration">${durationInHM}</span>
      <span class="film-card__genre">${filmCardData.genre}</span>
    </p>
    <img src="./images/posters/${filmCardData.image}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmCardData.shortDescription}</p>
    <a class="film-card__comments"><span class="film-card__comments-num"> ${filmCardData.commentsCount} ${filmCardData.commentsTitle} </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button" title="Add to watchlist">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button" title="Mark as watched">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button" title="Mark as favorite">Mark as favorite</button>
    </div>
  </article>`;
};

export default class SiteFilmCard extends Abstract {
  constructor(filmCardData) {
    super();
    this._filmCardData = filmCardData;
    this._showHandler = this._showHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._filmCardData);
  }

  _showHandler() {
    this._callback.click();
  }

  setShowHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments').forEach((item) => item.addEventListener('click', this._showHandler));
  }
}
