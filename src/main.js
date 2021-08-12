import SiteMenu from './view/menu.js';
// import { createFilmsContainer, createFilmCard, createTopRatedFilmsList, createMostCommentedFilmsList } from './view/films.js';
import SiteUserRank from './view/user-rank.js';
import { createPopup, createCommentItem} from './view/popup.js';
import FilmCard  from './mock/film-card-mock.js';
import SiteStatistics from './view/filtration.js';
import { renderTemplate, renderElement, RenderPosition } from './view/utils.js';
import SiteMenuFilter from './view/filters-menu';
import SiteStatisticsMenu from './view/statistics.js';
import SiteFilmsContainer from './view/create-films-list.js';
import SiteFilmCard from './view/film-card.js';
import SiteShowMoreButton from './view/show-more-button.js';
import SiteTopRatedFilmsList from './view/top-rated-films-list.js';
import SiteMostCommentedFilmsList from './view/most-commented-films-list.js';
import SitePopup from './view/popup.js';

let films;
let filmsList;
let filmsListContainer;


const body = document.querySelector('body');
const header = document.querySelector('.header');
const main = document.querySelector('.main');

const FILM_CARDS_COUNT = 20;
const FILM_CARDS_COUNT_PER_STEP = 5;
let filmCards = new Array(FILM_CARDS_COUNT).fill().map(() => {
  return new FilmCard;
});
console.log('filmCards до сортировки: ', filmCards);


renderElement(header, new SiteUserRank().getElement(), RenderPosition.BEFOREEND);
const statistics = new SiteStatistics(filmCards);
renderElement(main, new SiteMenu().getElement(statistics), RenderPosition.BEFOREEND);
renderElement(main, new SiteMenuFilter().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SiteStatisticsMenu().getElement(statistics), RenderPosition.BEFOREEND);
renderElement(main, new SiteFilmsContainer().getElement(), RenderPosition.BEFOREEND);

films = main.querySelector('.films')
filmsList = main.querySelector('.films-list');
filmsListContainer = main.querySelector('.films-list__container');

// Добавляет карточки фильмов в контейнер
for (let ii = 0; ii < Math.min(filmCards.length, FILM_CARDS_COUNT_PER_STEP); ii++) {
  renderElement(filmsListContainer, new SiteFilmCard().getElement(filmCards[ii]), RenderPosition.BEFOREEND);
}

// Описывает логику допоказа карточек фильмов
const loadMoreButton = new SiteShowMoreButton();
if (filmCards.length > FILM_CARDS_COUNT_PER_STEP) {
  let renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
  renderElement(filmsList, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

  loadMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCardsCount, renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP)
      .forEach((filmCard) => renderElement(filmsListContainer, new SiteFilmCard().getElement(filmCard), RenderPosition.BEFOREEND));
    renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;
    if (renderedFilmCardsCount >= filmCards.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });
}

// Сортировка фильмов от наибольшего к меньшему по рейтингу
const sortedFilmCardsRating = filmCards.slice().sort((a, b) => (b.rating - a.rating));
console.log('sortedfilmCards после сортировки: ', sortedFilmCardsRating)

// Добавляет контейнер для фильмов с наибольшим рейтингом
renderElement(films, new SiteTopRatedFilmsList().getElement(), RenderPosition.BEFOREEND);
const topRatedFilmsContainer = films.querySelector('.films-list--top-rated').querySelector('.films-list__container');

// Добавляет фильмы в контейнер с наибольшим рейтингом
for (let ii = 0; ii < 2; ii++) {
  renderElement(topRatedFilmsContainer, new SiteFilmCard().getElement(sortedFilmCardsRating[ii]), RenderPosition.BEFOREEND);
}

// Сортировка фильмов от наибольшего к наименьшему по количеству комментариев
const sortedFilmCardsComments = filmCards.slice().sort((a, b) => (b.commentsCount - a.commentsCount));

// Добавляет контейнер для фильмов с наибольшим количеством комментариев
renderElement(films, new SiteMostCommentedFilmsList().getElement(), RenderPosition.BEFOREEND);
const mostCommentedFilmsContainer = films.querySelector('.films-list--most-commented').querySelector('.films-list__container');

// Добавляет фильмы в контейнер с наибольшим количеством комментариев
for (let ii = 0; ii < 2; ii++) {
  renderElement(mostCommentedFilmsContainer, new SiteFilmCard().getElement(sortedFilmCardsComments[ii]), RenderPosition.BEFOREEND);
}

filmCards.forEach((item) => {
  const poster = new SiteFilmCard().getElement(item).querySelector('.film-card__poster');
  poster.addEventListener('click', () => {
    console.log('Клик')
  })
  console.log(poster)
})

// Создает попап
// renderTemplate(body, createPopup(slicedFilmCards[0]), 'beforeend');

// Добавляет комментарии в попап
// const popupCommentsContainer = body.querySelector('.film-details').querySelector('.film-details__comments-list');
// for (let ii = 0; ii < slicedFilmCards[0].commentsList.length; ii++) {
//   renderTemplate(popupCommentsContainer, createCommentItem(slicedFilmCards[0].commentsList[ii]), 'beforeend');
// }


