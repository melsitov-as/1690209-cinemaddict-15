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

// Заменяет один на элемент в массиве на другой, если этого элемента нет она просто вернёт этот массив обратно и ничего делать не будет
const updateItem = (items, update) => {
  const index = update._filmCardData.id;
  // const indexIsInArray = items.findIndex((item) => item.id === update.id)
  console.log(index);
  console.log(update._filmCardData.id);
  console.log(update._filmCardData.isInWatchlist);

  // if (indexIsInArray === -1) {
  //   items[index].id = update.id;
  // }

  // return items;
  // if (index === -1) {
  //   return items;
  // }

  // return {
  //   ...items.slice(0, index),
  //   update,
  //   ...items.slice(index + 1)
  // }
}

export { getDuration, getRandomPositiveFloat, getRandomPositiveInteger, updateItem };
