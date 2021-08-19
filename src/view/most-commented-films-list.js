import Abstract from './abstract.js';

// Создает список фильмов с наибольшим числом комментариев

const createMostCommentedFilmsList = () =>
  `<section class="films-list films-list--extra films-list--most-commented"">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
    </section>`;

export default class SiteMostCommentedFilmsList extends Abstract {
  getTemplate() {
    return createMostCommentedFilmsList();
  }
}

