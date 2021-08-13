import dayjs from 'dayjs';
import { getRandomPositiveFloat, getRandomPositiveInteger } from '../view/utils.js';

const IMAGES_LIST = [
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'the-dance-of-life.jpg',
  'the-man-with-the-golden-arm.jpg',
  'the-great-flamarion.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'made-for-each-other.png',
];

const TITLES_LIST = [
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'The Dance of Life',
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other',
];

const ORIGINAL_TITLES_LIST = [
  'Original Title - 1',
  'Original Title - 2',
  'Original Title - 3',
  'Original Title - 4',
  'Original Title - 5',
];

const DIRECTORS_LIST = [
  'Director - 1',
  'Director - 2',
  'Director - 3',
  'Director - 4',
  'Director - 5',
];

const SCREENWRITERS_LIST = [
  ' Screenwriter - 1',
  ' Screenwriter - 2',
  ' Screenwriter - 3',
];

const ACTORS_LIST = [
  ' Actor - 1',
  ' Actor - 2',
  ' Actor - 3',
  ' Actor - 4',
  ' Actor - 5',
];

const COUNTRIES_LIST = [
  'Country - 1',
  'Country - 2',
  'Country - 3',
  'Country - 4',
  'Country - 5',
];

const GENRES_LIST = [
  ' Drama',
  ' Mystery',
  ' Comedy',
  ' Cartoon',
  ' Western',
  ' Musical',
];

const SENTENCES_LIST = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. ',
];

const EMOJIES_LIST = [
  'smile.png',
  'sleeping.png',
  'puke.png',
  'angry.png',
];

const AUTHORS_LIST = [
  'Author - 1',
  'Author - 2',
  'Author - 3',
  'Author - 4',
  'Author - 5',
];

// Класс Генерирует случайный элемент в массиве
class RandomItem {
  getRandomItem(data) {
    return data[getRandomPositiveInteger(0, data.length - 1)];
  }
}

// Класс Генерирует случайный массив
class RandomArray {
  constructor() {
    this.count = 0;
    this.shuffeledArray = [];
  }

  shuffleArray() {
    return Math.random() - 0.5;
  }

  getRandomArray(arr) {
    this.count = getRandomPositiveInteger(1, arr.length - 1);
    this.shuffeledArray = arr.sort(this.shuffleArray);
    return this.shuffeledArray.slice(0, this.count);
  }
}

// Класс Генерирует рейтинг
class Rating {
  getRating() {
    return getRandomPositiveFloat(1, 10, 1);
  }
}

// Класс Генерирует дату релиза
class ReleaseDate {
  constructor() {
    this.maxDaysGap = 36500;
  }

  getDate() {
    const date = dayjs();
    const daysGap = getRandomPositiveInteger(1, this.maxDaysGap);
    const filmDate = date.add(-daysGap, 'day');
    return filmDate;
  }
}

// Класс Генерирует Жанр или Жанры
class GenreTitle {
  constructor() {
    this.genreTitle = '';
  }

  getGenreTitle(data) {
    if (data.length === 1) {
      this.genreTitle = 'Genre';
    } else {
      this.genreTitle = 'Genres';
    }

    return this.genreTitle;
  }
}

// Класс Генерирует описание
class Description {
  constructor() {
    this.descriprionsArray = new RandomArray().getRandomArray(SENTENCES_LIST);
  }

  getDescription() {
    let description = this.descriprionsArray.toString();
    const re = /,/gi;
    description = description.replace(re, '');

    return description;
  }
}

// Класс Генерирует короткое описание
class ShortDescription {
  getShortDescription(data) {
    let shortDescription;
    if (data.length > 140) {
      shortDescription = data.slice(0, 138);
      shortDescription += '...';
    } else {
      shortDescription = data;
    }

    return shortDescription;
  }
}
// Класс Генерирует возрастной рейтинг
class AgeRating {
  getAgeRating() {
    const num = getRandomPositiveInteger(0, 18);
    return `${num}+`;
  }
}

// Комментарии

class CommentTitle {
  getCommentTitle(data) {
    if (data === 1) {
      return 'comment';
    } else {
      return 'comments';
    }
  }
}

class CommentDate {
  constructor() {
    this.maxCommentMinutesGap = 5256000;
  }

  getCommentDate() {
    const commentMinutesGap = getRandomPositiveInteger(0, this.maxCommentMinutesGap);
    const date = dayjs();
    const commentDate = date.add(-commentMinutesGap, 'minutes'). format('YYYY/MM/DD HH:mm');
    return commentDate;
  }
}

// Класс Когда фильм был просмотрен
class DateWatched {
  constructor() {
    this.dateWatched = '';
    this.maxDateDaysGap = 365;
  }

  getDateWatched(data) {
    if (!data) {
      this.dateWatched = false;
    } else {
      const daysGap = getRandomPositiveInteger(0, this.maxDateDaysGap);
      this.dateWatched = dayjs();
      this.dateWatched.add(-daysGap, 'days');
    }

    return this.dateWatched;
  }
}

class Comment {
  constructor() {
    this.emoji = new RandomItem().getRandomItem(EMOJIES_LIST),
    this.text = new RandomItem().getRandomItem(SENTENCES_LIST),
    this.author = new RandomItem().getRandomItem(AUTHORS_LIST),
    this.date = new CommentDate().getCommentDate();
  }
}

class CommentsList {
  constructor() {
    this.commentsOfFilm = [];
  }

  getCommentsList(data) {
    for (let ii = 0; ii < data; ii++) {
      this.commentsOfFilm.push(new Comment());
    }

    return this.commentsOfFilm;
  }
}

export default class FilmCard {
  constructor() {
    this.image = new RandomItem().getRandomItem(IMAGES_LIST);
    this.title = new RandomItem().getRandomItem(TITLES_LIST);
    this.originalTitle = new RandomItem().getRandomItem(ORIGINAL_TITLES_LIST);
    this.rating = Number(new Rating().getRating());
    this.director = new RandomItem().getRandomItem(DIRECTORS_LIST);
    this.screenwriters = new RandomItem().getRandomItem(SCREENWRITERS_LIST);
    this.actors = new RandomItem().getRandomItem(ACTORS_LIST);
    this.releaseDate = new ReleaseDate().getDate();
    this.releaseDateDMY = this.releaseDate.format('DD MMMM YYYY');
    this.year = this.releaseDate.format('YYYY');
    this.totalDuration = getRandomPositiveInteger(0, 240);
    this.country = new RandomItem().getRandomItem(COUNTRIES_LIST);
    this.genre = new RandomArray().getRandomArray(GENRES_LIST);
    this.genreTitle = new GenreTitle().getGenreTitle(this.genre);
    this.description = new Description().getDescription();
    this.shortDescription = new ShortDescription().getShortDescription(this.description);
    this.ageRating = new AgeRating().getAgeRating();
    this.isInWatchlist = Boolean(getRandomPositiveInteger(0, 1));
    this.isWatched = Boolean(getRandomPositiveInteger(0, 1));
    this.dateWatched = new DateWatched().getDateWatched(this.isWatched);
    this.isInFavorites = Boolean(getRandomPositiveInteger(0, 1));
    this.commentsCount = getRandomPositiveInteger(0, 20);
    this.commentsTitle = new CommentTitle().getCommentTitle(this.commentsCount);
    this.commentsList = new CommentsList().getCommentsList(this.commentsCount);
  }
}


// Генерирует случайный элемент в массиве
// const getRandomItem = (data) => data[getRandomPositiveInteger(0, data.length - 1)];

// Генерирует случайный массив случайной длины
// const shuffleArray = (a, b) => {
//   return Math.random() - 0.5
// }

// // Получить случайный массив
// const getRandomArray = (arr) => {
//   const count = getRandomPositiveInteger(1, arr.length - 1);
//   const shuffeledArray = arr.sort(shuffleArray);
//   return shuffeledArray.slice(0, count);
// }


// Генерирует дату релиза
// const maxDaysGap = 36500;

// const getDate = () => {
//   let date = dayjs();
//   const daysGap = getRandomPositiveInteger(1, maxDaysGap);
//   let filmDate = date.add(-daysGap, 'day');

//   return filmDate;
// };

// Генерирует жанр или жанры

// const generateGenreTitle = (data) => {
//   let genreTitle;
//   if (data.length === 1) {
//     genreTitle = 'Genre';
//   } else {
//     genreTitle = 'Genres';
//   }

//   return genreTitle;
// };

// Генерирует описание
// const generateDescription = () => {
//   const descriptionsArray = getRandomArray(sentencesList)
//   let description = descriptionsArray.toString();
//   const re = /,/gi;
//   description = description.replace(re, '');

//   return description;
// };

// const generateShortDescription = (data) => {
//   let shortDescription;
//   if (data.length > 140) {
//     shortDescription = data.slice(0, 138);
//     shortDescription += '...';
//   } else {
//     shortDescription = data;
//   }

//   return shortDescription;
// };

// Генерирует возрастной рейтинг
// const generateAgeRating = () => {
//   const num = getRandomPositiveInteger(0, 18);
//   return `${num}'+'`;
// };


// Генерирует комментарии
// const generateCommentsCount = () => getRandomPositiveInteger(0, 20);

// const generateCommentTitle = (data) => {
//   if (data === 1) {
//     return 'comment';
//   } else {
//     return 'comments';
//   }
// };

// const generateCommentDate = () => {
//   const maxCommentMinutesGap = 5256000;
//   const commentMinutesGap = getRandomPositiveInteger(0, maxCommentMinutesGap);
//   let date = dayjs();
//   const commentDate = date.add(-commentMinutesGap, 'minutes').format('YYYY/MM/DD HH:mm');
//   return commentDate;
// };

// const generateComment = () =>
//   ({
//     emoji: getRandomItem(emojiesList),
//     text: getRandomItem(sentencesList),
//     author: getRandomItem(authorsList),
//     date: generateCommentDate(),
//   });

// const generateCommentsList = (data) => {
//   const commentsOfFilm = [];
//   for (let ii = 0; ii < data; ii++) {
//     commentsOfFilm.push(generateComment());
//   }
//   return commentsOfFilm;
// };

// Генерирует булево значение
// const getBoolean = () => Boolean(getRandomPositiveInteger(0, 1));

// const getDateWatched = (data) => {
//   let dateWatched;
//   const maxDateDaysGap = 365;
//   if (!data) {
//     dateWatched = false;
//   } else {
//     const daysGap = getRandomPositiveInteger(0, maxDateDaysGap);
//     dateWatched = dayjs().add(-daysGap, 'days');
//   }
//   return dateWatched;
// };


