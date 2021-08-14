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

// Генерирует случайный элемент в массиве
const getRandomItem = (data) => data[getRandomPositiveInteger(0, data.length - 1)];


// Класс Генерирует случайный массив

const shuffle = (array) => {
  for (let kk = 0; kk < array.length; kk++) {
    for (let ii = array.length - 1; ii > 0; ii--) {
      const jj = Math.floor(Math.random() * (ii + 1));
      [array[ii], array[jj]] = [array[jj], array[ii]];
    }
  }
  return array;
};

const getRandomArray = (array) => {
  const shuffeledArray = shuffle(array);
  const count = getRandomPositiveInteger(1, shuffeledArray.length);
  return shuffeledArray.slice(0, count);
};


// Генерирует рейтинг
const getRating = () => getRandomPositiveFloat(1, 10, 1);


// Класс Генерирует дату релиза
const getReleaseDate = () => {
  const maxDaysGap = 36500;
  const date = dayjs();
  const daysGap = getRandomPositiveInteger(1, maxDaysGap);
  return date.add(-daysGap, 'day');
};


// Генерирует Жанр или Жанры
const getGenreTitle = (data) => {
  if (data.length === 1) {
    return 'Genre';
  } else {
    return 'Genres';
  }
};

// Генерирует описание
const getDescription = (data) => {
  const descriptionsArray = getRandomArray(data);
  let description = descriptionsArray.toString();
  const re = /,/gi;
  description = description.replace(re, '');
  return description;
};


// Генерирует короткое описание
const getShortDescription = (data) => {
  let shortDescription;
  if (data.length > 140) {
    shortDescription = data.slice(0, 138);
    shortDescription += '...';
  } else {
    shortDescription = data;
  }

  return shortDescription;
};

// Генерирует возрастной рейтинг
const getAgeRating = () => {
  const num = getRandomPositiveInteger(0, 18);
  return `${num}+`;
};

// Комментарии
const getCommentsTitle = (data) => {
  if (data === 1) {
    return 'comment';
  } else {
    return 'comments';
  }
};

const getCommentDate = () => {
  const maxCommentMinutesGap = 5256000;
  const commentMinutesGap = getRandomPositiveInteger(0, maxCommentMinutesGap);
  const date = dayjs();
  const commentDate = date.add(-commentMinutesGap, 'minutes'). format('YYYY/MM/DD HH:mm');
  return commentDate;
};

const getComment = () =>
  ({
    emoji: getRandomItem(EMOJIES_LIST),
    text: getRandomItem(SENTENCES_LIST),
    author: getRandomItem(AUTHORS_LIST),
    data: getCommentDate(),
  });


const getCommentsCount = () => getRandomPositiveInteger(0, 20);

const getCommentsList = (count) => {
  const commentsOfFilm = [];
  for (let ii = 0; ii < count; ii++) {
    commentsOfFilm.push(getComment());
  }

  return commentsOfFilm;
};


// Когда фильм был просмотрен
const getDateWatched = (data) => {
  let dateWatched = '';
  const maxDateDaysGap = 365;

  if (data === false) {
    dateWatched = false;
  } else {
    const daysGap = getRandomPositiveInteger(0, maxDateDaysGap);
    dateWatched = dayjs();
    dateWatched.add(-daysGap, 'days');
  }

  return dateWatched;
};

const getFilmCard = () => {
  const releaseDate = getReleaseDate();
  const genre = getRandomArray(GENRES_LIST);
  const description = getDescription(SENTENCES_LIST);
  const isWatched = Boolean(getRandomPositiveInteger(0, 1));
  const commentsCount = getCommentsCount();
  return {
    image: getRandomItem(IMAGES_LIST),
    title: getRandomItem(TITLES_LIST),
    originalTitle: getRandomItem(ORIGINAL_TITLES_LIST),
    rating: Number(getRating()),
    director: getRandomItem(DIRECTORS_LIST),
    screenwriters: getRandomArray(SCREENWRITERS_LIST),
    actors: getRandomArray(ACTORS_LIST),
    releaseDate: releaseDate,
    releaseDateDMY: releaseDate.format('DD MMMM YYYY'),
    year: releaseDate.format('YYYY'),
    totalDuration: getRandomPositiveInteger(0, 240),
    country: getRandomItem(COUNTRIES_LIST),
    genre: genre,
    genreTitle: getGenreTitle(genre),
    description: description,
    shortDescription: getShortDescription(description),
    ageRating: getAgeRating(),
    isInWatchlist: Boolean(getRandomPositiveInteger(0, 1)),
    isWatched: isWatched,
    dateWatched: getDateWatched(isWatched),
    isInFavorites: Boolean(getRandomPositiveInteger(0, 1)),
    commentsCount: commentsCount,
    commentsTitle: getCommentsTitle(commentsCount),
    commentsList: getCommentsList(commentsCount),
  };
};

export { getFilmCard };
