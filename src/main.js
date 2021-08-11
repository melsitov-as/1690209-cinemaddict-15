import SiteMenu from './view/menu.js';
import { createFilmsContainer, createFilmCard, createTopRatedFilmsList, createMostCommentedFilmsList } from './view/films.js';
import SiteUserRank from './view/user-rank.js';
import { createShowMoreButton } from './view/show-more-button.js';
import { createPopup, createCommentItem} from './view/popup.js';
import FilmCard  from './mock/film-card-mock.js';
import SiteStatistics from './view/statisctics-filters.js';
import { renderTemplate, renderElement, RenderPosition } from './view/utils.js';

let films;
let filmsList;
let filmsListContainer;


const body = document.querySelector('body');
const header = document.querySelector('.header');
const main = document.querySelector('.main');


const newFilmCard = new FilmCard();
console.log(newFilmCard);
const FILM_CARDS_COUNT = 20;
// const FILM_CARDS_COUNT_PER_STEP = 5;
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(new FilmCard());
// const slicedFilmCards = filmCards.slice(0, 5);

console.log(new SiteUserRank().getElement())
renderElement(header, new SiteUserRank().getElement(), RenderPosition.BEFOREEND);
// renderTemplate(main, createMenu(getStatistics(filmCards)), 'beforeend');
// renderTemplate(main, createFilters(), 'beforeend');
// renderTemplate(main, createStatistics(getStatistics(filmCards)), 'beforeend');
// renderTemplate(main, createFilmsContainer(), 'beforeend');

// films = main.querySelector('.films')
// filmsList = main.querySelector('.films-list');
// filmsListContainer = main.querySelector('.films-list__container');

// Добавляет карточки фильмов в контейнер
// for (let ii = 0; ii < Math.min(filmCards.length, FILM_CARDS_COUNT_PER_STEP); ii++) {
//   renderTemplate(filmsListContainer, createFilmCard(filmCards[ii]), 'beforeend');
// }

// Описывает логику допоказа карточек фильмов
// if (filmCards.length > FILM_CARDS_COUNT_PER_STEP) {
//   let renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
//   renderTemplate(filmsList, createShowMoreButton(), 'beforeend');
//   const loadMoreButton = filmsList.querySelector('.films-list__show-more');

//   loadMoreButton.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     filmCards
//       .slice(renderedFilmCardsCount, renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP)
//       .forEach((filmCard) => renderTemplate(filmsListContainer, createFilmCard(filmCard), 'beforeend'));
//     renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;
//     if (renderedFilmCardsCount >= filmCards.length) {
//       loadMoreButton.remove();
//     }
//   });
// }

//Сортировка фильмов от наибольшего к меньшему по рейтингу
// filmCards.sort((a, b) => (b.rating - a.rating));


// Добавляет контейнер для фильмов с наибольшbv рейтингом
// renderTemplate(films, createTopRatedFilmsList(), 'beforeend');
// const topRatedFilmsContainer = films.querySelector('.films-list--top-rated').querySelector('.films-list__container');

//Добавляет фильмы в контейнер с наибольшим рейтингом
// for (let ii = 0; ii < 2; ii++) {
//   renderTemplate(topRatedFilmsContainer, createFilmCard(filmCards[ii]), 'beforeend');
// }

// Сортировка фильмов от наибольшего к наименьшему по количеству комментариев
// filmCards.sort((a, b) => (b.commentsCount - a.commentsCount));

// Добавляет контейнер для фильмов с наибольшим количеством комментариев
// renderTemplate(films, createMostCommentedFilmsList(), 'beforeend');
// const mostCommentedFilmsContainer = films.querySelector('.films-list--most-commented').querySelector('.films-list__container');

//Добавляет фильмы в контейнер с наибольшим количеством комментариев
// for (let ii = 0; ii < 2; ii++) {
//   renderTemplate(mostCommentedFilmsContainer, createFilmCard(filmCards[ii]), 'beforeend');
// }

// Создает попап
// renderTemplate(body, createPopup(slicedFilmCards[0]), 'beforeend');

// Добавляет комментарии в попап
// const popupCommentsContainer = body.querySelector('.film-details').querySelector('.film-details__comments-list');
// for (let ii = 0; ii < slicedFilmCards[0].commentsList.length; ii++) {
//   renderTemplate(popupCommentsContainer, createCommentItem(slicedFilmCards[0].commentsList[ii]), 'beforeend');
// }


