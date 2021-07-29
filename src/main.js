import {createMenu, createFilters, createStatistics} from "./view/menu.js"
import { createFilmsList, createFilmCard } from "./view/film-card.js";

const main = document.querySelector('.main');

console.log('createMenu', createMenu());


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

const renderFilmsList = (container, templateFilmsList, templateFilmCard, place) => {
  container.insertAdjacentHTML(place, templateFilmsList);
  const filmsListContainer = main.querySelector('.films-list__container')
  for (let ii = 0; ii < 5; ii++) {
    filmsListContainer.insertAdjacentHTML(place, templateFilmCard);
  }
}

render(main, createMenu(), 'beforeend');
render(main, createFilters(), 'beforeend');
render(main, createStatistics(), 'beforeend');
renderFilmsList(main, createFilmsList(), createFilmCard, 'beforeend');

