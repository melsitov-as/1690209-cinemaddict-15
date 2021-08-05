import dayjs from 'dayjs';

// Генерирует случайное дробное число
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

// Генерирует случайное целое число

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Генерирует изображение
const generateImage = () => {
  const imagesList = [
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'the-dance-of-life.jpg',
    'the-man-with-the-golden-arm.jpg',
    'the-great-flamarion.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'made-for-each-other.png'
  ]

  const generatedImage = imagesList[getRandomPositiveInteger(0, imagesList.length - 1)];
  return generatedImage;
}

// Генерирует заголовок
const generateTitle = () => {
  const titlesList = [
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Sagebrush Trail',
    'The Dance of Life',
    'The Man with the Golden Arm',
    'The Great Flamarion',
    'Santa Claus Conquers the Martians',
    'Made for Each Other'
  ]

  const generatedTitle = titlesList[getRandomPositiveInteger(0, titlesList.length - 1)];
  return generatedTitle;
}

// Генерирует оригинальное название фильма
const generateOriginalTitle = () => {
  const originalTitlesList = [
    'Original Title - 1',
    'Original Title - 2',
    'Original Title - 3',
    'Original Title - 4',
    'Original Title - 5'
  ]

  const generatedOriginalTitle = originalTitlesList[getRandomPositiveInteger(0, originalTitlesList.length - 1)];
  return generatedOriginalTitle;
}

// Генерирует рейтинг
const generateRating = () => {
  const generatedRating = getRandomPositiveFloat(1, 10, 1)
  return generatedRating;
}

// Генерирует фамилию режиссера
const generateDirector = () => {
  const directorsList = [
    'Director - 1',
    'Director - 2',
    'Director - 3',
    'Director - 4',
    'Director - 5'
  ]

  const generatedDirector = directorsList[getRandomPositiveInteger(0, directorsList.length - 1)];
  return generatedDirector;
}

// Удаляет последний элемент в массиве


// Генерирует фамилии сценаристов
const screenwritersList = [
  ' Screenwriter - 1',
  ' Screenwriter - 2',
  ' Screenwriter - 3'
]

const generateRandomScreenwriter = () => {
  return screenwritersList[getRandomPositiveInteger(0, screenwritersList.length - 1)];
}

const generateScreenwriters = () => {
  let generatedScreewritersList = [];
  for (let ii = 0; ii < 3; ii++) {
    const screenwriter = generateRandomScreenwriter();
    const compareScreenwriters = generatedScreewritersList.some((value) => value === screenwriter);
    if (!compareScreenwriters) {
      generatedScreewritersList.push(screenwriter);
    }
  }

  return generatedScreewritersList;
}

// Генерирует фамилии актеров
const actorsList = [
  ' Actor - 1',
  ' Actor - 2',
  ' Actor - 3',
  ' Actor - 4',
  ' Actor - 5',
]

const generateRandomActor = () => {
  return actorsList[getRandomPositiveInteger(0, actorsList.length - 1)];
}

const generateActors = () => {
  let generatedActorsList = [];
  for (let ii = 0; ii < 3; ii++) {
    const actor = generateRandomActor();
    const compareActors = generatedActorsList.some((value) => value === actor);
    if (!compareActors) {
      generatedActorsList.push(actor);
    }
  }

  return generatedActorsList;
};
// Генерирует дату релиза
const maxDaysGap = 36500;
let date;

const getDate = () => {
  const daysGap = getRandomPositiveInteger(1, maxDaysGap);
  date = dayjs().add(-daysGap, 'day')

  return date;
}


// Генерирует продолжительность
const generateDuration = () => {
  let duration = '';
  let generatedDurationMinutes = getRandomPositiveInteger(0, 240);
  if (generatedDurationMinutes < 60) {
    duration = `${generatedDurationMinutes}m`
  } else {
    let durationHours = Math.floor(generatedDurationMinutes / 60);
    let durationMinutes = generatedDurationMinutes % 60;
    duration = `${durationHours}h ${durationMinutes}m`
  }
  return {
    durationInM: generatedDurationMinutes,
    durationInHM: duration
  }
}

// Генерирует страну
const countriesList = [
  'Country - 1',
  'Country - 2',
  'Country - 3',
  'Country - 4',
  'Country - 5'
];

const generateCountry = () => {
  return countriesList[getRandomPositiveInteger(0, countriesList.length - 1)]
}

// Генерирует жанр
const genresList = [
  ' Drama',
  ' Mystery',
  ' Comedy',
  ' Cartoon',
  ' Western',
  ' Musical',
]

const generateNumberOfGenres = () => {
  return getRandomPositiveInteger(1, 3);
}

const generateRandomGenre = () => {
  return genresList[getRandomPositiveInteger(0, genresList.length - 1)]
}

const generateGenresOfFilm = () => {
  let genresOfFilmList = [];
  for (let ii = 0; ii < generateNumberOfGenres(); ii++) {
    const newGenre = generateRandomGenre();
    const compareGenres = genresOfFilmList.some((value) => value === newGenre);
    if (!compareGenres) {
      genresOfFilmList.push(newGenre);
    }
  }
  return genresOfFilmList
}


const generateGenreTitle = (data) => {
  let genreTitle;
  if (data.length === 1) {
    genreTitle = 'Genre'
  } else {
    genreTitle = 'Genres'
  }

  return genreTitle;
}

// Генерирует описание
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
  'In rutrum ac purus sit amet tempus. '
];

const generateRandomSentence = () => {
  return sentencesList[getRandomPositiveInteger(0, sentencesList.length - 1)]
}

const generateNumberOfSentences = () => {
  return getRandomPositiveInteger(1, sentencesList.length);
}

const generateDescription = () => {
  let generatedSentencesList = [];
  for (let ii = 0; ii < generateNumberOfSentences(); ii++) {
    const sentence = generateRandomSentence();
    const compareSentences = generatedSentencesList.some((value) => value === sentence);
    if (!compareSentences) {
      generatedSentencesList.push(sentence);
    }
  }
  let description = generatedSentencesList.toString()
  let re = /,/gi;
  description = description.replace(re, '');

  return description;
}

const generateShortDescription = (data) => {
  let shortDescription;
  if (data.length > 140) {
    shortDescription = data.slice(0, 138);
    shortDescription += '...';
  } else {
    shortDescription = data
  }

  return shortDescription;
}

// Генерирует возрастной рейтинг
const generateAgeRating = () => {
  const num = getRandomPositiveInteger(0, 18);
  return num + '+';
}


// Генерирует комментарии
const emojiesList = [
  'smile.png',
  'sleeping.png',
  'puke.png',
  'angry.png'
]

const authorsList = [
  'Author - 1',
  'Author - 2',
  'Author - 3',
  'Author - 4',
  'Author - 5'
]

const generateCommentsCount = () => {
  return getRandomPositiveInteger(0, 20);
}

const generateCommentTitle = (data) => {
  if (data === 1) {
    return 'comment';
  } else {
    return 'comments';
  }
}

const generateEmoji = () => {
  return emojiesList[getRandomPositiveInteger(0, emojiesList.length - 1)]
}

const generateText = () => {
  return sentencesList[getRandomPositiveInteger(0, sentencesList.length - 1)]
}

const generateAuthor = () => {
  return authorsList[getRandomPositiveInteger(0, authorsList.length - 1)]
}

const generateDate = () => {
  let commentDate;
  let maxCommentMinutesGap = 5256000;
  const commentMinutesGap = getRandomPositiveInteger(0, maxCommentMinutesGap)
  commentDate = dayjs().add(-commentMinutesGap, 'minutes').format('YYYY/MM/DD HH:mm')
  return commentDate
}

const generateComment = () => {
  return {
    emoji: generateEmoji(),
    text: generateText(),
    author: generateAuthor(),
    date: generateDate()
  }
}


const generateCommentsList = (data) => {
  let commentsOfFilm = [];
  for (let ii = 0; ii < data; ii++) {
    commentsOfFilm.push(generateComment())
  }
  return commentsOfFilm;
}

// Генерирует булево значение
const getBoolean = () => {
  return Boolean(getRandomPositiveInteger(0, 1));
}

const getDateWatched = (data) => {
  let dateWatched;
  let maxDaysGap = 365;
  if (!data) {
    dateWatched = false;
  } else {
    let daysGap = getRandomPositiveInteger(0, maxDaysGap);
    dateWatched = dayjs().add(-daysGap, 'days')
  }
  return dateWatched;
}

const generateFilmCard = () => {
  getDate();
  const genresOfFilmList = generateGenresOfFilm();
  const genreTitle = generateGenreTitle(genresOfFilmList);
  const description = generateDescription();
  const shortDescription = generateShortDescription(description);
  const duration = generateDuration();
  const isWatched = getBoolean();
  const dateWatched = getDateWatched(isWatched);
  const commentsCount = generateCommentsCount();
  return {
    image: generateImage(),
    title: generateTitle(),
    originalTitle: generateOriginalTitle(),
    rating: generateRating(),
    director: generateDirector(),
    screenwriters: generateScreenwriters(),
    actors: generateActors(),
    releaseDateYear: date.format('DD MMMM YYYY'),
    year: date.format('YYYY'),
    durationInM: duration.durationInM,
    durationInHM: duration.durationInHM,
    country: generateCountry(),
    genre: genresOfFilmList,
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
  }
}



export { generateFilmCard };
