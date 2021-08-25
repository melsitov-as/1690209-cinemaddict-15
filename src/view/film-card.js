import { getDuration } from '../utils/common.js';
import Abstract from './abstract.js';

const addStatus = (filmCardData) => {
  const status = {
    isInWatchlistActive: '',
    isWatchedActive: '',
    isInFavoritesActive: '',
  };
  if (filmCardData.isInWatchlist === true) {
    status.isInWatchlistActive = 'film-card__controls-item--active';
  }

  if (filmCardData.isWatched === true) {
    status.isWatchedActive = 'film-card__controls-item--active';
  }

  if (filmCardData.isInFavorites === true) {
    status.isInFavoritesActive = 'film-card__controls-item--active';
  }

  return status;
};

// Создает карточку фильма
const createFilmCard = (filmCardData) => {
  const durationInHM = getDuration(filmCardData.totalDuration);
  const status = addStatus(filmCardData);
  return `<article class="film-card film-card-${filmCardData.id}">
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
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${status.isInWatchlistActive}" type="button" title="Add to watchlist">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${status.isWatchedActive}" type="button" title="Mark as watched">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${status.isInFavoritesActive}" type="button" title="Mark as favorite">Mark as favorite</button>
    </div>
  </article>`;
};

export default class SiteFilmCard extends Abstract {
  constructor(filmCardData) {
    super();
    this._filmCardData = filmCardData;
    this._showHandler = this._showHandler.bind(this);
    this._isInWatchlistHandler = this._isInWatchlistHandler.bind(this);
    this._isWatchedHandler = this._isWatchedHandler.bind(this);
    this._isInFavoritesHandler = this._isInFavoritesHandler.bind(this);
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

  // Обработчик события, он будет вызываться и здесь будут выполняться какие-то действия
  // click - это класс определил интерфейс
  _isInWatchlistHandler() {
    this._callbackWatchlist.click();
  }

  setIsInWatchlistHandler(callback) {
    this._callbackWatchlist.click = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._isInWatchlistHandler);
  }

  _isWatchedHandler() {
    this._callbackWatched.click();
  }

  setIsWatchedHandler(callback) {
    this._callbackWatched.click = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._isWatchedHandler);
  }

  _isInFavoritesHandler() {
    this._callbackInFavorites.click();
  }

  setIsInFavoritesHandler(callback) {
    this._callbackInFavorites.click = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._isInFavoritesHandler);
  }
}
