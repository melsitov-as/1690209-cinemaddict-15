"use strict";

var _menu = require("./view/menu.js");

var _films = require("./view/films.js");

var _userRank = require("./view/user-rank.js");

var _showMoreButton = require("./view/show-more-button.js");

var _popup = require("./view/popup.js");

var _filmCardMock = require("./mock/film-card-mock.js");

var films;
var filmsList;
var filmsListContainer;
var body = document.querySelector('body');
var header = document.querySelector('.header');
var main = document.querySelector('.main');
var FILM_CARDS_COUNT = 20;
var FILM_CARD_PER_STEP = 5;
var filmCards = new Array(FILM_CARDS_COUNT).fill().map(_filmCardMock.generateFilmCard);
console.log('filmCards: ', filmCards);
var slicedFilmCards = filmCards.slice(0, 5); // Описывает логику допоказа карточек фильмов

if (filmCards.length > FILM_CARD_PER_STEP) {
  render(filmsList, (0, _showMoreButton.createShowMoreButton)(), 'beforeend');
} // Статистика
// Собирает данные об общей длительности
// Фильтр inWatchList


var getFilterInWatchlist = function getFilterInWatchlist(filmCardsData) {
  return filmCardsData.filter(function (filmCard) {
    return filmCard.isInWatchlist;
  }).length;
}; // Фильтр watched


var getFilterWatched = function getFilterWatched(filmCardsData) {
  return filmCardsData.filter(function (filmCard) {
    return filmCard.isWatched;
  }).length;
}; //Фильтр in favorites


var getFilterInFavorites = function getFilterInFavorites(filmCardsData) {
  return filmCardsData.filter(function (filmCard) {
    return filmCard.isInFavorites;
  }).length;
}; // Общая длительность просмотренных фильмов


var getTotalDuration = function getTotalDuration(filmCardsData) {
  var totalDurationInMinutes = 0;
  var totalDurationH = 0;
  var totalDurationM = 0;
  var watchedFilms = getFilterWatched(filmCardsData);

  for (var ii = 0; ii < watchedFilms; ii++) {
    totalDurationInMinutes += filmCardsData[ii].durationInM;
  }

  totalDurationH = Math.floor(totalDurationInMinutes / 60);
  totalDurationM = totalDurationInMinutes % 60;
  return {
    totalDurationInH: totalDurationH,
    totalDurationInM: totalDurationM
  };
}; // Генерирует top genre


var getTopGenre = function getTopGenre(filmCardsData) {
  var dramaCount = 0;
  var mysteryCount = 0;
  var comedyCount = 0;
  var cartoonCount = 0;
  var westernCount = 0;
  var mysicalCount = 0;
  var greatestNum;
  var allGenresList = [];

  for (var ii = 0; ii < filmCardsData.length; ii++) {
    for (var jj = 0; jj < filmCardsData[ii].genre.length; jj++) {
      allGenresList.push(filmCardsData[ii].genre[jj]);
    }
  }

  allGenresList.forEach(function (genre) {
    if (genre === ' Drama') {
      dramaCount++;
    } else if (genre === ' Mystery') {
      mysteryCount++;
    } else if (genre === ' Comedy') {
      comedyCount++;
    } else if (genre === ' Western') {
      westernCount++;
    } else {
      mysicalCount++;
    }
  });
  greatestNum = dramaCount;

  if (mysteryCount > greatestNum) {
    greatestNum = mysteryCount;
  }

  if (comedyCount > greatestNum) {
    greatestNum = comedyCount;
  }

  if (cartoonCount > greatestNum) {
    greatestNum = cartoonCount;
  }

  if (westernCount > greatestNum) {
    greatestNum = westernCount;
  }

  if (mysicalCount > greatestNum) {
    greatestNum = mysicalCount;
  }

  if (greatestNum === dramaCount) {
    return 'Drama';
  } else if (greatestNum === mysteryCount) {
    return 'Mystery';
  } else if (greatestNum === comedyCount) {
    return 'Comedy';
  } else if (greatestNum === cartoonCount) {
    return 'Cartoon';
  } else if (greatestNum === westernCount) {
    return 'Western';
  } else {
    return 'Mysical';
  }
};

var getStatistics = function getStatistics(filmCards) {
  var totalDuration = getTotalDuration(filmCards);
  return {
    totalDurationInH: totalDuration.totalDurationInH,
    totalDurationInM: totalDuration.totalDurationInM,
    all: filmCards.length,
    inWatchlistCount: getFilterInWatchlist(filmCards),
    inHistoryCount: getFilterWatched(filmCards),
    inFavoritesCount: getFilterInFavorites(filmCards),
    topGenre: getTopGenre(filmCards)
  };
};

console.log(getStatistics(filmCards)); // Рендер элементов

var render = function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}; // Рендер контейнера для списка фильмов


var renderFilmsContainer = function renderFilmsContainer(container, templateFilmsList, place) {
  container.insertAdjacentHTML(place, templateFilmsList);
  films = main.querySelector('.films');
  filmsList = main.querySelector('.films-list');
  filmsListContainer = main.querySelector('.films-list__container');
  return {
    films: films,
    filmsList: filmsList,
    filmsListContainer: filmsListContainer
  };
};

render(header, (0, _userRank.createUserRank)(), 'beforeend');
render(main, (0, _menu.createMenu)(getStatistics(filmCards)), 'beforeend');
render(main, (0, _menu.createFilters)(), 'beforeend');
render(main, (0, _menu.createStatistics)(getStatistics(filmCards)), 'beforeend');
renderFilmsContainer(main, (0, _films.createFilmsContainer)(), 'beforeend');

for (var ii = 0; ii < slicedFilmCards.length; ii++) {
  render(filmsListContainer, (0, _films.createFilmCard)(slicedFilmCards[ii]), 'beforeend');
} //Сортировка фильмов от наибольшего к меньшему по рейтингу


filmCards.sort(function (a, b) {
  return b.rating - a.rating;
});
console.log(filmCards); // Добавляет контейнер для фильмов с наибольшbv рейтингом

render(films, (0, _films.createTopRatedFilmsList)(), 'beforeend');
var topRatedFilmsContainer = films.querySelector('.films-list--top-rated').querySelector('.films-list__container'); //Добавляет фильмы в контейнер с наибольшим рейтингом

for (var _ii = 0; _ii < 2; _ii++) {
  render(topRatedFilmsContainer, (0, _films.createFilmCard)(filmCards[_ii]), 'beforeend');
} // Сортировка фильмов от наибольшего к наименьшему по количеству комментариев


filmCards.sort(function (a, b) {
  return b.commentsCount - a.commentsCount;
});
console.log(filmCards); // Добавляет контейнер для фильмов с наибольшим количеством комментариев

render(films, (0, _films.createMostCommentedFilmsList)(), 'beforeend');
var mostCommentedFilmsContainer = films.querySelector('.films-list--most-commented').querySelector('.films-list__container'); //Добавляет фильмы в контейнер с наибольшим количеством комментариев

for (var _ii2 = 0; _ii2 < 2; _ii2++) {
  render(mostCommentedFilmsContainer, (0, _films.createFilmCard)(filmCards[_ii2]), 'beforeend');
} // render(body, createPopup(slicedFilmCards[0]), 'beforeend');
// let popupCommentsContainer = body.querySelector('.film-details').querySelector('.film-details__comments-list');
// for (let ii = 0; ii < slicedFilmCards[0].commentsList.length; ii++) {
//   console.log(slicedFilmCards[0].commentsList[ii].emoji)
//   render(popupCommentsContainer, createCommentItem(slicedFilmCards[0].commentsList[ii]), 'beforeend')
// }
// console.log(slicedFilmCards[0].commentsList[0].emoji)
// popupCommentsList = body.querySelector('.film-details__comments-list');
// console.log(popupCommentsList);
// for (let ii = 0; ii<slicedAllFilmsComments[0].commentsOfFilmList.length; ii++) {
//   render(popupCommentsList, createCommentItem(slicedAllFilmsComments[0].commentsOfFilmList[ii]), 'beforeend')
// }