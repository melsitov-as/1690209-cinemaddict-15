// Рендер положения элемента
const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

//Рендер элемента
const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Рендер шаблона
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Создает элемент
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Длительность фильма
const getDuration = (data) => {
  if (data < 60) {
    return `${data % 60}m`;
  } else if (data === 60) {
    return `${data / 60}h`;
  } else {
    return `${Math.floor(data / 60)}h ${data % 60}m`;
  }
};

// Создает карточку фильма
const createFilmCard = (SiteFilmCardData, filmCardsDataIndex, SitePopupData, SiteCommentItemData, bodyData) => {
  const filmCard = new SiteFilmCardData(filmCardsDataIndex);
  filmCard.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    const popup = new SitePopupData(filmCardsDataIndex).getElement();
    popup.querySelector('.film-details__close-btn').addEventListener('click', () => {
      bodyData.removeChild(popup);
      bodyData.classList.remove('hide-overflow');
    });
    bodyData.appendChild(popup);
    const popupCommentsContainer = popup.querySelector('.film-details__comments-list');
    filmCardsDataIndex.commentsList.forEach((item) => {
      renderElement(popupCommentsContainer, new SiteCommentItemData(item).getElement(), RenderPosition.BEFOREEND);
    });

    for (let ii = 0; ii < filmCardsDataIndex.commentsList.length; ii++) {
      renderElement(popupCommentsContainer, new SiteCommentItemData(filmCardsDataIndex.commentsList[ii]).getElement(), RenderPosition.BEFOREEND);
    }

    bodyData.classList.add('hide-overflow');
  });

  return filmCard;
};

// Генерирует случайное дробное число
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

// Генерирует случайное целое число
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export { RenderPosition, renderElement, renderTemplate, createElement, getDuration, getRandomPositiveFloat, getRandomPositiveInteger, createFilmCard };
