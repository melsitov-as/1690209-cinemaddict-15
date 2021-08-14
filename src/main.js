import SiteMenu from './view/menu.js';
import SiteUserRank from './view/user-rank.js';
import { getFilmCard }  from './mock/film-card-mock.js';
import SiteStatistics from './view/filtration.js';
import { renderElement, RenderPosition } from './view/utils.js';
import SiteMenuFilter from './view/filters-menu';
import SiteStatisticsMenu from './view/statistics.js';
import SiteFilmsContainer from './view/create-films-list.js';
import SiteFilmCard from './view/film-card.js';
import SiteShowMoreButton from './view/show-more-button.js';
import SiteTopRatedFilmsList from './view/top-rated-films-list.js';
import SiteMostCommentedFilmsList from './view/most-commented-films-list.js';
import SitePopup from './view/popup.js';
import SiteCommentItem from './view/popup-comment-item.js';
import FooterStatisticsMessage from './view/footer-statistics-message';

const body = document.querySelector('body');
const header = document.querySelector('.header');
const main = document.querySelector('.main');

const FILM_CARDS_COUNT = 20;
const FILM_CARDS_COUNT_PER_STEP = 5;
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(() => getFilmCard());


// Создает карточку фильма
const showPopup = (filmCardData, sitePopupData) => {
  const poster = filmCardData.getElement().querySelector('.film-card__poster');
  const title = filmCardData.getElement().querySelector('.film-card__title');
  const comments = filmCardData.getElement().querySelector('.film-card__comments');
  const popup = sitePopupData.getElement();

  const closeButton = popup.querySelector('.film-details__close-btn');
  closeButton.addEventListener('click', () => {
    body.removeChild(popup);
    body.classList.remove('hide-overflow');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'esc') {
      if (body.contains(popup)) {
        body.removeChild(popup);
        body.classList.remove('hide-overflow');
      }
    }
  });
  poster.addEventListener('click', () => {
    body.appendChild(popup);
    body.classList.add('hide-overflow');
  });
  title.addEventListener('click', () => {
    body.appendChild(popup);
    body.classList.add('hide-overflow');
  });
  comments.addEventListener('click', () => {
    body.appendChild(popup);
    body.classList.add('hide-overflow');
  });
};


const statistics = new SiteStatistics(filmCards);
renderElement(main, new SiteMenu(statistics).getElement(), RenderPosition.BEFOREEND);

if (FILM_CARDS_COUNT === 0) {

  renderElement(main, new SiteFilmsContainer().getElement(), RenderPosition.BEFOREEND);

  const filmsListTitle = main.querySelector('.films').querySelector('.films-list__title');

  filmsListTitle.classList.remove('visually-hidden');

  filmsListTitle.textContent = 'There are no movies in our database';

  const footerStatistics = body.querySelector('.footer').querySelector('.footer__statistics');
  renderElement(footerStatistics, new FooterStatisticsMessage().getElement(), RenderPosition.BEFOREEND);

} else {

  // Показывает ранг пользователя
  renderElement(header, new SiteUserRank().getElement(), RenderPosition.BEFOREEND);

  // Позавает меню с фильтрами
  renderElement(main, new SiteMenuFilter().getElement(), RenderPosition.BEFOREEND);

  // Показывает статистику
  renderElement(main, new SiteStatisticsMenu(statistics).getElement(), RenderPosition.BEFOREEND);

  // Добавляет контейнер для фильмов
  renderElement(main, new SiteFilmsContainer().getElement(), RenderPosition.BEFOREEND);
  const filmsListContainer = main.querySelector('.films').querySelector('.films-list__container');

  // Добавляет карточки фильмов в контейнер
  for (let ii = 0; ii < Math.min(filmCards.length, FILM_CARDS_COUNT_PER_STEP); ii++) {
    const filmCard = new SiteFilmCard(filmCards[ii]);
    const sitePopup = new SitePopup(filmCards[ii]);
    const popupCommentsContainer = sitePopup.getElement().querySelector('.film-details__comments-list');
    filmCards[ii].commentsList.forEach((item) => {
      renderElement(popupCommentsContainer, new SiteCommentItem(item).getElement(), RenderPosition.BEFOREEND);
    });
    renderElement(filmsListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
    showPopup(filmCard, sitePopup);
  }

  // Описывает логику допоказа карточек фильмов
  const loadMoreButton = new SiteShowMoreButton();
  if (filmCards.length > FILM_CARDS_COUNT_PER_STEP) {
    let renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
    const filmsList = main.querySelector('.films').querySelector('.films-list');
    renderElement(filmsList, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

    loadMoreButton.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      filmCards
        .slice(renderedFilmCardsCount, renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP)
        .forEach((filmCard) => {
          const filmCardLoaded = new SiteFilmCard(filmCard);
          const sitePopupLoaded = new SitePopup(filmCard);
          const popupCommentsContainerLoaded = sitePopupLoaded.getElement().querySelector('.film-details__comments-list');
          filmCard.commentsList.forEach((item) => {
            renderElement(popupCommentsContainerLoaded, new SiteCommentItem(item).getElement(), RenderPosition.BEFOREEND);
          });
          renderElement(filmsListContainer, filmCardLoaded.getElement(), RenderPosition.BEFOREEND);
          showPopup(filmCardLoaded, sitePopupLoaded);
        });
      renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;
      if (renderedFilmCardsCount >= filmCards.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }

  // Сортировка фильмов от наибольшего к меньшему по рейтингу
  const sortedFilmCardsRating = filmCards.slice().sort((a, b) => (b.rating - a.rating));

  // Добавляет контейнер для фильмов с наибольшим рейтингом
  const films = main.querySelector('.films');
  renderElement(films, new SiteTopRatedFilmsList().getElement(), RenderPosition.BEFOREEND);
  const topRatedFilmsContainer = films.querySelector('.films-list--top-rated').querySelector('.films-list__container');

  // Добавляет фильмы в контейнер с наибольшим рейтингом
  for (let ii = 0; ii < 2; ii++) {
    const filmCardTopRated = new SiteFilmCard(sortedFilmCardsRating[ii]);
    const sitePopupTopRated = new SitePopup(sortedFilmCardsRating[ii]);
    const popupCommentsContainerTopRated = sitePopupTopRated.getElement().querySelector('.film-details__comments-list');
    sortedFilmCardsRating[ii].commentsList.forEach((item) => {
      renderElement(popupCommentsContainerTopRated, new SiteCommentItem(item).getElement(), RenderPosition.BEFOREEND);
    });
    renderElement(topRatedFilmsContainer, filmCardTopRated.getElement(), RenderPosition.BEFOREEND);
    showPopup(filmCardTopRated, sitePopupTopRated);
  }

  // Сортировка фильмов от наибольшего к наименьшему по количеству комментариев
  const sortedFilmCardsComments = filmCards.slice().sort((a, b) => (b.commentsCount - a.commentsCount));

  // Добавляет контейнер для фильмов с наибольшим количеством комментариев
  renderElement(films, new SiteMostCommentedFilmsList().getElement(), RenderPosition.BEFOREEND);
  const mostCommentedFilmsContainer = films.querySelector('.films-list--most-commented').querySelector('.films-list__container');

  // Добавляет фильмы в контейнер с наибольшим количеством комментариев
  for (let ii = 0; ii < 2; ii++) {
    const filmCardMostCommented = new SiteFilmCard(sortedFilmCardsComments[ii]);
    const sitePopupMostCommented = new SitePopup(sortedFilmCardsComments[ii]);
    const popupCommentsContainerMostCommented = sitePopupMostCommented.getElement().querySelector('.film-details__comments-list');
    sortedFilmCardsRating[ii].commentsList.forEach((item) => {
      renderElement(popupCommentsContainerMostCommented, new SiteCommentItem(item).getElement(), RenderPosition.BEFOREEND);
    });
    renderElement(mostCommentedFilmsContainer, filmCardMostCommented.getElement(), RenderPosition.BEFOREEND);
    showPopup(filmCardMostCommented, sitePopupMostCommented);
  }
}
