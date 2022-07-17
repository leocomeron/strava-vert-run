export const dateHandler = (date) => {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);

  return `${day}-${month}-${year}`;
};

export const timeHandler = (time) => {
  return new Date(time * 1000).toISOString().substr(11, 8);
};
