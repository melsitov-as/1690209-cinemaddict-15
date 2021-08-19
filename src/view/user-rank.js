import Abstract from './abstract.js';

// Созадает ранг пользователя

const createUserRankTemplate = () =>
  `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class SiteUserRank extends Abstract {
  getTemplate() {
    return createUserRankTemplate();
  }
}

