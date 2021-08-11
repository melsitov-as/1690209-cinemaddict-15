// Статистика
// Собирает данные об общей длительности
// Класс Фильтры
class Filters {
  static getFilterInWatchList(filmCardsData) {
    return filmCardsData.filter((filmCard) => filmCard.isInWatchlist).length;
  }

  static getFilterWatched(filmCardsData) {
    return filmCardsData.filter((filmCard) => filmCard.isWatched).length;
  }

  static getFilterInFavorites(filmCardsData) {
    return filmCardsData.filter((filmCard) => filmCard.isInFavorites).length;
  }
}


// Класс Общая продолжительность просмотренных фильмов
class TotalDuration {
  constructor() {
    this.totalDuration = 0;
    this.watchedFilms = Filters.getFilterWatched(filmCardsData);
  }

  static getTotalDuration(filmCardsData) {
    for (let ii = 0; ii < this.watchedFilms; ii++) {
      this.totalDuration += filmCardsData[ii].totalDuration;
    }
  }
}


// Фильтр inWatchList
// const getFilterInWatchlist = (filmCardsData) => filmCardsData.filter((filmCard) => filmCard.isInWatchlist).length;


// Фильтр watched
// const getFilterWatched = (filmCardsData) => filmCardsData.filter((filmCard) => filmCard.isWatched).length;


//Фильтр in favorites
// const getFilterInFavorites = (filmCardsData) => filmCardsData.filter((filmCard) => filmCard.isInFavorites).length;

// Общая длительность просмотренных фильмов
const getTotalDuration = (filmCardsData) => {
  let totalDuration = 0;
  const watchedFilms = getFilterWatched(filmCardsData);
  for (let ii = 0; ii < watchedFilms; ii++) {
    totalDuration += filmCardsData[ii].totalDuration;
  }

  return totalDuration;
};


// Генерирует top genre
const getTopGenre = (filmCardsData) => {
  let dramaCount = 0;
  let mysteryCount = 0;
  let comedyCount = 0;
  let cartoonCount = 0;
  let westernCount = 0;
  let mysicalCount = 0;
  let greatestNum;
  const allGenresList = [];
  for (let ii = 0; ii < filmCardsData.length; ii++) {
    for(let jj = 0; jj < filmCardsData[ii].genre.length; jj++) {
      allGenresList.push(filmCardsData[ii].genre[jj]);
    }
  }
  allGenresList.forEach((genre) => {
    if (genre === ' Drama') {
      dramaCount++;
    } else if (genre === ' Mystery') {
      mysteryCount++;
    } else if (genre === ' Comedy') {
      comedyCount++;
    } else if (genre === 'Cartoon') {
      cartoonCount++;
    } else if (genre === ' Western') {
      westernCount++;
    } else {
      mysicalCount++;
    }
  });

  greatestNum = dramaCount;
  if (mysteryCount > greatestNum) {
    greatestNum = mysteryCount;
  }
  if (comedyCount > greatestNum) {
    greatestNum = comedyCount;
  }
  if (cartoonCount > greatestNum) {
    greatestNum = cartoonCount;
  }
  if (westernCount > greatestNum) {
    greatestNum = westernCount;
  }
  if (mysicalCount > greatestNum) {
    greatestNum = mysicalCount;
  }

  if (greatestNum === dramaCount) {
    return 'Drama';
  } else if (greatestNum === mysteryCount) {
    return 'Mystery';
  } else if (greatestNum === comedyCount) {
    return 'Comedy';
  } else if (greatestNum === cartoonCount) {
    return 'Cartoon';
  } else if (greatestNum === westernCount) {
    return 'Western';
  } else {
    return 'Mysical';
  }
};

class SiteStatistics {
  getStatistics(filmCardsData) {
    return {
      totalDuration: getTotalDuration(filmCardsData),
      all: filmCardsData.length,
      inWatchlistCount: getFilterInWatchlist(filmCardsData),
      inHistoryCount: getFilterWatched(filmCardsData),
      inFavoritesCount: getFilterInFavorites(filmCardsData),
      topGenre: getTopGenre(filmCardsData),
    };
  }
}


export { SiteStatistics };
