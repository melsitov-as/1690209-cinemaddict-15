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

export { getDuration, getRandomPositiveFloat, getRandomPositiveInteger };
