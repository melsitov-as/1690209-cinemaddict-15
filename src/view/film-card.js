import { createElement, getDuration } from "./utils.js";

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
}

export default class SiteFilmCard {
  contructor() {
    this._element = null;
  }

  getTemplate(filmCardData) {
    return createFilmCard(filmCardData);
  }

  getElement(filmCardData) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(filmCardData));
    }

    return this._element
  }

  removeElement() {
    this._element = null;
  }
}



