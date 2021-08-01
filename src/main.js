import { createMenu, createFilters, createStatistics } from './view/menu.js';
import { createFilmsList, createFilmCard, createTopRatedFilmsList, createMostCommentedFilmsList } from './view/films.js';
import { createUserRank} from './view/user-rank.js';
import { createShowMoreButton } from './view/show-more-button.js';
import { createPopup } from './view/popup.js';
import { generateFilmCard } from './mock/task-mock.js';


let filmsList;
let films;
const body = document.querySelector('body');
const header = document.querySelector('.header');
const main = document.querySelector('.main');

// Рендер элементов
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Рендер списка фильмов

const renderFilmsList = (container, templateFilmsList, templateFilmCard, place) => {
  container.insertAdjacentHTML(place, templateFilmsList);
  const filmsListContainer = main.querySelector('.films-list__container');
  films = main.querySelector('.films');
  filmsList = main.querySelector('.films-list');
  for (let ii = 0; ii < 5; ii++) {
    filmsListContainer.insertAdjacentHTML(place, templateFilmCard());
  }

  return {
    films,
    filmsList,
  };
};

// Рендер списков фильмов с наибольшим числом комментариев и фильмов с самым высоким рейтингом

const renderFilmsListExtra = (container, templateFilmsListExtra, templateFilmCard, name, place) => {
  container.insertAdjacentHTML(place, templateFilmsListExtra);
  const filmsListExtra = container.querySelector(`.films-list--${name}`);
  const filmsListContainerExtra = filmsListExtra.querySelector('.films-list__container');
  for (let ii = 0; ii < 2; ii++) {
    filmsListContainerExtra.insertAdjacentHTML(place, templateFilmCard());
  }
};

render(header, createUserRank(), 'beforeend');
render(main, createMenu(), 'beforeend');
render(main, createFilters(), 'beforeend');
render(main, createStatistics(), 'beforeend');
renderFilmsList(main, createFilmsList(), createFilmCard, 'beforeend');
render(filmsList, createShowMoreButton(), 'beforeend');
renderFilmsListExtra(films, createTopRatedFilmsList(), createFilmCard, 'top-rated', 'beforeend');
renderFilmsListExtra(films, createMostCommentedFilmsList(), createFilmCard, 'most-commented', 'beforeend');
// render(body, createPopup(), 'beforeend');
console.log(generateFilmCard());

