// Movies-board - отвечает за все доску с фильмами
// Это класс
// В этом классе нужно позаботиться о нескольких методах и о конструкторе
// В методах класса должно быть то, чем управляет presenter
// Если что-то отрисовывается, что-то обрабатывается это в presenter'е
// То что в main.js - разложить по методам класса

import { getFilmCard } from "../mock/film-card-mock";
import { remove, render, RenderPosition } from "../utils/render";
import { updateItem } from '../utils/common.js';
import SiteFilmsContainer from "../view/create-films-list";
import SiteUserRank from "../view/user-rank";
import SiteMenuFilter from "../view/filters-menu.js";
import FooterStatisticsMessage from "../view/footer-statistics-message";
import SiteTopRatedFilmsList from "../view/top-rated-films-list";
import SiteMostCommentedFilmsList from "../view/most-commented-films-list";
import SiteStatistics from "../view/filtration.js";
import SiteStatisticsMenu from "../view/statistics.js";
import SiteShowMoreButton from "../view/show-more-button";
import SitePopup from "../view/popup.js";
import SiteCommentItem from "../view/popup-comment-item.js";
import SiteFilmCard from "../view/film-card.js";
import SiteMenu from '../view/menu.js'


const FILM_CARDS_COUNT = 20;
const FILM_CARDS_COUNT_PER_STEP = 5;

const body = document.querySelector('body');
const header = document.querySelector('.header');
const main = document.querySelector('.main');


export default class MoviesBoard {
  // Constructor используется для конфигурации презентера, а метод init вызывается когда этому презентеру нужно начать работать
  // То есть условно мы в конструкторе получаем некий контейнер, куда нужно отрисовывать board-Доску - это будем dom-элемент
  constructor() {
    this._siteFilmsContainer = new SiteFilmsContainer();
    this._userRank = new SiteUserRank();
    this._filmCardsArray = new Array(FILM_CARDS_COUNT).fill().map(() => getFilmCard());
    this._statistics = new SiteStatistics(this._filmCardsArray);
    this._siteMenu = new SiteMenu(this._statistics);
    this._siteMenuFilter = new SiteMenuFilter();
    this._footerStatisticsMessage = new FooterStatisticsMessage();
    this._topRatedFilmsList = new SiteTopRatedFilmsList();
    this._mostCommentedFilmsList = new SiteMostCommentedFilmsList();
    this._renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
    this._loadMoreButton = new SiteShowMoreButton();
    this._updatedFilmCardData = [];
  }


  // Не обязательная штука, это тот способ, который предлагают не значит, что так нужно делать можно обойтись только одним конструктором
  init() {
    if (FILM_CARDS_COUNT === 0) {
      this._renderNoFilms();
    } else {
      this._getFilmCardId(this._filmCardsArray);
      this._renderUserRank();
      this._renderSiteMenu();
      this._renderMenuFilter();
      this._renderFilms();
      // this._renderFilmsPreScreening();
      // this._renderFilmsTopRated();
      // this._renderFilmsMostCommented();
    }
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _getPopupWithComments(filmCardData) {
    let popup = this._getPopup(filmCardData);
    let popupCommentsContainer = popup.getElement().querySelector('.film-details__comments-list')
    filmCardData.commentsList.forEach((item) => {
      render(popupCommentsContainer, this._getPopupCommentItem(item), RenderPosition.BEFOREEND);
    })

    return popup;
  }

  _changeFilmCardData(filmCardData, popupData) {
    filmCardData.setIsInWatchlistHandler(() => {
      // Изменяет значение в статистике в watchlist
      const buttonWatchlist = filmCardData.getElement().querySelector('.film-card__controls-item--add-to-watchlist');
      buttonWatchlist.classList.toggle('film-card__controls-item--active')
      if (buttonWatchlist.classList.contains('film-card__controls-item--active')) {
        this._statistics.inWatchlistCount += 1;
        filmCardData.isInWatchlist = true;
      } else {
        filmCardData.isInWatchlist = false;
        this._statistics.inWatchlistCount -= 1;
      }
      if (this._statistics.inWatchlistCount < 0) {
        this._statistics.inWatchlistCount = 0;
      }
      // Заменяет значение в исходном массиве
      const indexWatchlist = filmCardData._filmCardData.id;
      this._filmCardsArray[indexWatchlist].isInWatchlist = filmCardData.isInWatchlist;
      this._clearBoard();
      this.init();

      let updatedFilmCardData = this._filmCardsArray[filmCardData._filmCardData.id]
      let newPopupWithComments = this._getPopupWithComments(updatedFilmCardData);
      if (body.contains(popupData.getElement())) {
        body.removeChild(popupData.getElement());
        this._addPopupToBody(newPopupWithComments);
      }


    })
    filmCardData.setIsWatchedHandler(() => {
      const buttonWatched = filmCardData.getElement().querySelector('.film-card__controls-item--mark-as-watched');
      buttonWatched.classList.toggle('film-card__controls-item--active');
      if (buttonWatched.classList.contains('film-card__controls-item--active')) {
        this._statistics.inHistoryCount += 1;
        filmCardData.isWatched = true;
      } else {
        this._statistics.inHistoryCount -= 1;
        filmCardData.isWatched = false;
        filmCardData.dateWatched = false;
      }
      if (this._statistics.inHistoryCount < 0) {
        this._statistics.inHistoryCount = 0;
      }
      // Заменяет значение в исходном массиве
      const indexWatched = filmCardData._filmCardData.id;
      this._filmCardsArray[indexWatched].isWatched = filmCardData.isWatched;
      this._clearBoard();
      this.init();
      if (body.contains(popupData.getElement())) {
        body.removeChild(popupData.getElement());
      }
      let updatedFilmCardData = this._filmCardsArray[filmCardData._filmCardData.id]
      let newPopupWithComments = this._getPopupWithComments(updatedFilmCardData);
      this._addPopupToBody(newPopupWithComments);
    })
    filmCardData.setIsInFavoritesHandler(() => {
      const buttonFavorites = filmCardData.getElement().querySelector('.film-card__controls-item--favorite');
      buttonFavorites.classList.toggle('film-card__controls-item--active');
      if (buttonFavorites.classList.contains('film-card__controls-item--active')) {
        this._statistics.inFavoritesCount += 1;
        filmCardData.isInFavorites = true;
      } else {
        this._statistics.inFavoritesCount -= 1;
        filmCardData.isInFavorites = false;
      }
      if (this._statistics.isInFavoritesCount < 0) {
        this._statistics.isInFavoritesCount = 0;
      }
      // Заменяет значение в исходном массиве
      const indexFavorites = filmCardData._filmCardData.id;
      this._filmCardsArray[indexFavorites].isInFavorites = filmCardData.isInFavorites;
      this._clearBoard();
      this.init();
    })

  }

  _clearBoard() {
    remove(this._userRank);
    remove(this._siteMenu);
    remove(this._siteMenuFilter);
    remove(this._siteFilmsContainer )



    // console.log(renderedFilmCardsList);
  }

  // Получает данные для карточки фильма
  _getFilmCard(filmCardData) {
    return new SiteFilmCard(filmCardData);
  }


  // Получает данные для попапа
  _getPopup(filmCardData) {
    return new SitePopup(filmCardData);
  }

  _getPopupCommentItem(filmCardData) {
    return new SiteCommentItem(filmCardData);
  }

  // Если нет фильмов
  _renderNoFilms() {
    render(main, this._siteFilmsContainer, RenderPosition.BEFOREEND);
    const filmsListTitle = main.querySelector('.films').querySelector('.films-list__title');
      filmsListTitle.classList.remove('visually-hidden');
      filmsListTitle.textContent = 'There are no movies in our database';

      const footerStatistics = body.querySelector('.footer').querySelector('.footer__statistics');
      render(footerStatistics, this._footerStatisticsMessage, RenderPosition.BEFOREEND);
  }

  // Рендерит ранг пользователя
  _renderUserRank() {
    render(header, this._userRank, RenderPosition.BEFOREEND);
  }

  _renderMenuFilter() {
    render(main, this._siteMenuFilter, RenderPosition.BEFOREEND);
  }

  _renderFilms() {
    // Добавляет контейнер для фильмов
    render(main, this._siteFilmsContainer, RenderPosition.BEFOREEND);
    const filmsListContainer = main.querySelector('.films').querySelector('.films-list__container');

    for (let ii = 0; ii < Math.min(this._filmCardsArray.length, FILM_CARDS_COUNT_PER_STEP); ii++) {
      const filmCard = this._getFilmCard(this._filmCardsArray[ii]);

      const sitePopup = this._getPopup(this._filmCardsArray[ii]);
      const popupCommentsContainer = sitePopup.getElement().querySelector('.film-details__comments-list');
      this._filmCardsArray[ii].commentsList.forEach((item) => {
        render(popupCommentsContainer, this._getPopupCommentItem(item), RenderPosition.BEFOREEND);
      })
      render(filmsListContainer, filmCard, RenderPosition.BEFOREEND);
      filmCard.setShowHandler(() => this._addPopupToBody(sitePopup));
      this._changeFilmCardData(filmCard, sitePopup);
    }

  }

  // Описывает логику допоказа фильмов
  _renderFilmsPreScreening() {
    const filmsListContainer = main.querySelector('.films').querySelector('.films-list__container');
    if (this._filmCardsArray.length > FILM_CARDS_COUNT_PER_STEP) {
      let renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
      const filmsList = main.querySelector('.films').querySelector('.films-list');
      render(filmsList, this._loadMoreButton, RenderPosition.BEFOREEND);
      this._loadMoreButton.setShowMoreHandler(() => {
        this._filmCardsArray
          .slice(renderedFilmCardsCount, renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP)
          .forEach((filmCard) => {
            const filmCardLoaded = this._getFilmCard(filmCard);
            const sitePopupLoaded = this._getPopup(filmCard);
            const popupCommentsContainerLoaded = sitePopupLoaded.getElement().querySelector('.film-details__comments-list');
            filmCard.commentsList.forEach((item) => {
              render(popupCommentsContainerLoaded, this._getPopupCommentItem(item), RenderPosition.BEFOREEND);
            });
            render(filmsListContainer, filmCardLoaded, RenderPosition.BEFOREEND);
            this._showPopup(filmCardLoaded, sitePopupLoaded);
          })
        renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;
        if (renderedFilmCardsCount >= this._filmCardsArray.length) {
          this._loadMoreButton.getElement.remove();
          this._loadMoreButton.removeElement();
        }
      })
    }
  }

  _getTopRatedFilmsContainer() {
    const films = main.querySelector('.films');
    render (films, this._topRatedFilmsList, RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = films.querySelector('.films-list--top-rated').querySelector('.films-list__container');

    return topRatedFilmsContainer;
  }


  // Рендерит фильмы с наибольшим рейтингом в контейнере
  _renderFilmsTopRated() {
    // Добавляет контейнер для фильмов с наибольшим рейтингом
    const topRatedFilmsContainer = this._getTopRatedFilmsContainer();

    const sortedFilmCardsByRating = this._sortFilmsByRating(this._filmCardsArray);
    // Добавляет фильмы в контейнер с наибольшим рейтингом
    for (let ii = 0; ii < 2; ii++) {
      const filmCardTopRated = this._getFilmCard(sortedFilmCardsByRating[ii]);
      const sitePopupTopRated = this._getPopup(sortedFilmCardsByRating[ii]);
      const popupCommentsContainerTopRated = sitePopupTopRated.getElement().querySelector('.film-details__comments-list');
      sortedFilmCardsByRating[ii].commentsList.forEach((item) => {
        render(popupCommentsContainerTopRated, this._getPopupCommentItem(item), RenderPosition.BEFOREEND);
      });
      render(topRatedFilmsContainer, filmCardTopRated, RenderPosition.BEFOREEND);
      this._showPopup(filmCardTopRated, sitePopupTopRated);
    }
  }

  // Рендерит фильмы с наиболььшим количеством комментариев
  _renderFilmsMostCommented() {
    // Добавляет контейнер для фильмов с наибольшим количеством комментариев
    const films = main.querySelector('.films');
    render (films, this._mostCommentedFilmsList, RenderPosition.BEFOREEND);
    const mostCommentedFilmsContainer = films.querySelector('.films-list--most-commented').querySelector('.films-list__container');

    const sortedFilmCardsByComments = this._sortFilmsByComments(this._filmCardsArray);

    // Добаляет фильмы в контейнер с наибольшим рейтингом
    for (let ii = 0; ii < 2; ii++) {
      const filmCardMostCommented = this._getFilmCard(sortedFilmCardsByComments[ii]);
      const sitePopupMostCommented = this._getPopup(sortedFilmCardsByComments[ii]);
      const popupCommentsContainerMostCommented = sitePopupMostCommented.getElement().querySelector('.film-details__comments-list');
      sortedFilmCardsByComments[ii].commentsList.forEach((item) => {
        render(popupCommentsContainerMostCommented, this._getPopupCommentItem(item), RenderPosition.BEFOREEND);
      });
      render(mostCommentedFilmsContainer, filmCardMostCommented, RenderPosition.BEFOREEND);
      this._showPopup(filmCardMostCommented, sitePopupMostCommented);
    }
  }

  // Сортирует фильмы по рейтингу от наибольшего к наименьшему
  _sortFilmsByRating(filmCardsData) {
    return filmCardsData.slice().sort((a, b) => (b.rating - a.rating))
  }

  // Сортирует фильмы по количеству комментариев от наибольшего к наименьшему
  _sortFilmsByComments(filmCardsData) {
    return filmCardsData.slice().sort((a, b) => (b.commentsCount - a.commentsCount));
  }

  _showPopup(sitePopupData) {
    body.appendChild(sitePopupData);
    body.classList.add('hide-overflow');
  }

  // Показывает попап
  _showPopup(sitePopupData) {
    body.appendChild(sitePopupData.getElement());
    body.classList.add('hide-overflow');
  }

  // Получает попап с обработчиками кликов
  _addPopupToBody(sitePopupData) {
    const popup = sitePopupData.getElement()

    if (body.contains(body.querySelector('.film-details'))) {
      body.removeChild(body.querySelector('.film-details'));
    }

    body.appendChild(popup);
    body.classList.add('hide-overflow');

    const remove = () => {
      body.removeChild(popup);
      body.classList.remove('hide-overflow');
    };

    sitePopupData.setClickHandler(() => {
      remove();
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' || evt.key === 'esc') {
        if (body.contains(popup)) {
          remove();
          document.removeEventListener('click', remove);
        }
      }
    });


    // filmCardData.setShowHandler(() => {
    //   append()
    // })
  }


  // Получает статистику
  _getStatistics() {
    return new SiteStatistics(this._getFilmCardsArray());
  }

  // Показывает статистику
  _renderStatistics() {
    render(main, new SiteStatisticsMenu(this._getStatistics), RenderPosition.BEFOREEND);
  }

  // _renderFilmCardsFromTo(from, to) {
  // }

  _renderSiteMenu() {
    render(main, this._siteMenu, RenderPosition.BEFOREEND);
  }

  _getFilmCardId(filmCardsData) {
    for (let ii = 0; ii < filmCardsData.length; ii++) {
      filmCardsData[ii].id = ii;
    }
  }
}
