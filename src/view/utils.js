const getDuration = (data) => {
  if (data < 60) {
    return `${data % 60}m`;
 } else if (data === 60) {
    return `${data / 60}h`;
 } else {
    return `${Math.floor(data / 60)}h ${data % 60}m`
 }
}

export { getDuration }
