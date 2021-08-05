// Создает список фильмов

const createFilmsContainer = () =>
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
  </section>`;

// Создает карточку фильма

const createFilmCard = (filmCardData) => {
  return `<article class="film-card">
    <h3 class="film-card__title">${filmCardData.title}</h3>
    <p class="film-card__rating">${filmCardData.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmCardData.year}</span>
      <span class="film-card__duration">${filmCardData.durationInHM}</span>
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
  </article>`
};

// Создает список фильмов с наибольшим рейтингом

const createTopRatedFilmsList = () =>
  `<section class="films-list films-list--extra films-list--top-rated">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`;

// Создает список фильмов с наибольшим числом комментариев

const createMostCommentedFilmsList = () =>
  `<section class="films-list films-list--extra films-list--most-commented"">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
    </section>`;

export {createFilmsContainer, createFilmCard, createTopRatedFilmsList, createMostCommentedFilmsList};
