// Статистика
// Собирает данные об общей длительности
// Класс Фильтры
class Filters {
  getFilterInWatchlist(filmCardsData) {
    return filmCardsData.filter((filmCard) => filmCard.isInWatchlist).length;
  }

  getFilterWatched(filmCardsData) {
    return filmCardsData.filter((filmCard) => filmCard.isWatched).length;
  }

  getFilterInFavorites(filmCardsData) {
    return filmCardsData.filter((filmCard) => filmCard.isInFavorites).length;
  }
}


// Класс Общая продолжительность просмотренных фильмов
class TotalDuration {
  constructor(filmCardsData) {
    this.totalDuration = 0;
    this.watchedFilms = new Filters().getFilterWatched(filmCardsData);
  }

  getTotalDuration(filmCardsData) {
    for (let ii = 0; ii < this.watchedFilms; ii++) {
      this.totalDuration += filmCardsData[ii].totalDuration;
    }

    return this.totalDuration;
  }
}

// Класс Top Genre
class TopGenre {
  constructor() {
    this.dramaCount = 0;
    this.mysteryCount = 0;
    this.comedyCount = 0;
    this.cartoonCount = 0;
    this.westernCount = 0;
    this.mysicalCount = 0;
    this.greatestNum = 0;
    this.allGenresList = [];
  }

  getTopGenre(filmCardsData) {
    for (let ii = 0; ii < filmCardsData.length; ii++) {
      for(let jj = 0; jj < filmCardsData[ii].genre.length; jj++) {
        this.allGenresList.push(filmCardsData[ii].genre[jj]);
      }
    }

    this.allGenresList.forEach((genre) => {
      if (genre === ' Drama') {
        this.dramaCount++;
      } else if (genre === ' Mystery') {
        this.mysteryCount++;
      } else if (genre === ' Comedy') {
        this.comedyCount++;
      } else if (genre === ' Cartoon') {
        this.cartoonCount++;
      } else if (genre === ' Western') {
        this.westernCount++;
      } else {
        this.mysicalCount++;
      }
    });

    this.greatestNum = this.dramaCount;
    if (this.mysteryCount > this.greatestNum) {
      this.greatestNum = this.mysteryCount;
    }
    if (this.comedyCount > this.greatestNum) {
      this.greatestNum = this.comedyCount;
    }
    if (this.cartoonCount > this.greatestNum) {
      this.greatestNum = this.cartoonCount;
    }
    if (this.westernCount > this.greatestNum) {
      this.greatestNum = this.westernCount;
    }
    if (this.mysicalCount > this.greatestNum) {
      this.greatestNum = this.mysicalCount;
    }

    if (this.greatestNum === this.dramaCount) {
      return 'Drama';
    } else if (this.greatestNum === this.mysteryCount) {
      return 'Mystery';
    } else if (this.greatestNum === this.comedyCount) {
      return 'Comedy';
    } else if (this.greatestNum === this.cartoonCount) {
      return 'Cartoon';
    } else if (this.greatestNum === this.westernCount) {
      return 'Western';
    } else {
      return 'Mysical';
    }
  }
}

export default class SiteStatistics {
  constructor(filmCardsData) {
    this.inWatchlistCount = new Filters().getFilterInWatchlist(filmCardsData);
    this.inHistoryCount = new Filters().getFilterWatched(filmCardsData);
    this.inFavoritesCount = new Filters().getFilterWatched(filmCardsData);
    this.totalDuration = new TotalDuration(filmCardsData).getTotalDuration(filmCardsData);
    this.topGenre = new TopGenre().getTopGenre(filmCardsData);
  }
}
