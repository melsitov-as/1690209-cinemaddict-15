import Abstract from './abstract.js';


const createCommentItem = (filmCardsData) =>
  `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
  <img src="./images/emoji/${filmCardsData.emoji}" width="55" height="55" alt="emoji-sleeping">
  </span>
  <div>
    <p class="film-details__comment-text">${filmCardsData.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${filmCardsData.author}</span>
      <span class="film-details__comment-day">${filmCardsData.date}</span>
      <button class="film-details__comment-delete">Delete</button>
      </p>
      </div>
  </li>`;

export default class SiteCommentItem extends Abstract {
  constructor(filmCardData) {
    super();
    this._filmCardData = filmCardData;
  }

  getTemplate() {
    return createCommentItem(this._filmCardData);
  }
}

