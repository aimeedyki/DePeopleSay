export const replaceArrayItem = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};
