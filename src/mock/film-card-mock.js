import dayjs from 'dayjs';

const imagesList = [
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'the-dance-of-life.jpg',
  'the-man-with-the-golden-arm.jpg',
  'the-great-flamarion.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'made-for-each-other.png',
];

const titlesList = [
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'The Dance of Life',
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other',
];

const originalTitlesList = [
  'Original Title - 1',
  'Original Title - 2',
  'Original Title - 3',
  'Original Title - 4',
  'Original Title - 5',
];

const directorsList = [
  'Director - 1',
  'Director - 2',
  'Director - 3',
  'Director - 4',
  'Director - 5',
];

const screenwritersList = [
  ' Screenwriter - 1',
  ' Screenwriter - 2',
  ' Screenwriter - 3',
];

const actorsList = [
  ' Actor - 1',
  ' Actor - 2',
  ' Actor - 3',
  ' Actor - 4',
  ' Actor - 5',
];

const countriesList = [
  'Country - 1',
  'Country - 2',
  'Country - 3',
  'Country - 4',
  'Country - 5',
];

const genresList = [
  ' Drama',
  ' Mystery',
  ' Comedy',
  ' Cartoon',
  ' Western',
  ' Musical',
];

const sentencesList = [
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

const emojiesList = [
  'smile.png',
  'sleeping.png',
  'puke.png',
  'angry.png',
];

const authorsList = [
  'Author - 1',
  'Author - 2',
  'Author - 3',
  'Author - 4',
  'Author - 5',
];

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

// Генерирует случайный элемент в массиве
const getRandomItem = (data) => data[getRandomPositiveInteger(0, data.length - 1)];

// Генерирует случайный массив случайной длины
const shuffleArray = (a, b) => {
  return Math.random() - 0.5
}

// Получить случайный массив
const getRandomArray = (arr) => {
  const count = getRandomPositiveInteger(1, arr.length - 1);
  const shuffeledArray = arr.sort(shuffleArray);
  return shuffeledArray.slice(0, count);
}


// Генерирует рейтинг
const generateRating = () => {
  const generatedRating = getRandomPositiveFloat(1, 10, 1);
  return generatedRating;
};



// Генерирует дату релиза
const maxDaysGap = 36500;

const getDate = () => {
  let date = dayjs();
  const daysGap = getRandomPositiveInteger(1, maxDaysGap);
  let filmDate = date.add(-daysGap, 'day');

  return filmDate;
};

// Генерирует жанр или жанры

const generateGenreTitle = (data) => {
  let genreTitle;
  if (data.length === 1) {
    genreTitle = 'Genre';
  } else {
    genreTitle = 'Genres';
  }

  return genreTitle;
};

// Генерирует описание
const generateDescription = () => {
  const descriptionsArray = getRandomArray(sentencesList)
  let description = descriptionsArray.toString();
  const re = /,/gi;
  description = description.replace(re, '');

  return description;
};

const generateShortDescription = (data) => {
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
const generateAgeRating = () => {
  const num = getRandomPositiveInteger(0, 18);
  return `${num}'+'`;
};


// Генерирует комментарии
const generateCommentsCount = () => getRandomPositiveInteger(0, 20);

const generateCommentTitle = (data) => {
  if (data === 1) {
    return 'comment';
  } else {
    return 'comments';
  }
};

const generateCommentDate = () => {
  const maxCommentMinutesGap = 5256000;
  const commentMinutesGap = getRandomPositiveInteger(0, maxCommentMinutesGap);
  let date = dayjs();
  const commentDate = date.add(-commentMinutesGap, 'minutes').format('YYYY/MM/DD HH:mm');
  return commentDate;
};

const generateComment = () =>
  ({
    emoji: getRandomItem(emojiesList),
    text: getRandomItem(sentencesList),
    author: getRandomItem(authorsList),
    date: generateCommentDate(),
  });

const generateCommentsList = (data) => {
  const commentsOfFilm = [];
  for (let ii = 0; ii < data; ii++) {
    commentsOfFilm.push(generateComment());
  }
  return commentsOfFilm;
};

// Генерирует булево значение
const getBoolean = () => Boolean(getRandomPositiveInteger(0, 1));

const getDateWatched = (data) => {
  let dateWatched;
  const maxDateDaysGap = 365;
  if (!data) {
    dateWatched = false;
  } else {
    const daysGap = getRandomPositiveInteger(0, maxDateDaysGap);
    dateWatched = dayjs().add(-daysGap, 'days');
  }
  return dateWatched;
};

const generateFilmCard = () => {
  const filmDate = getDate();
  const genre = getRandomArray(genresList);
  const genreTitle = generateGenreTitle(genre);
  const description = generateDescription();
  const shortDescription = generateShortDescription(description);
  const isWatched = getBoolean();
  const dateWatched = getDateWatched(isWatched);
  const commentsCount = generateCommentsCount();
  return {
    image: getRandomItem(imagesList),
    title: getRandomItem(titlesList),
    originalTitle: getRandomItem(originalTitlesList),
    rating: generateRating(),
    director: getRandomItem(directorsList),
    screenwriters: getRandomArray(screenwritersList),
    actors: getRandomArray(actorsList),
    releaseDateYear: filmDate.format('DD MMMM YYYY'),
    year: filmDate.format('YYYY'),
    totalDuration: getRandomPositiveInteger(0, 240),
    country: getRandomItem(countriesList),
    genre: genre,
    genreTitle: genreTitle,
    description: description,
    shortDescription: shortDescription,
    ageRating: generateAgeRating(),
    isInWatchlist: getBoolean(),
    isWatched: isWatched,
    dateWatched: dateWatched,
    isInFavorites: getBoolean(),
    commentsCount: commentsCount,
    commentsTitle: generateCommentTitle(commentsCount),
    commentsList: generateCommentsList(commentsCount),
  };
};

export { generateFilmCard };
