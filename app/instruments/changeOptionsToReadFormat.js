export const changeOptionsToReadFormat = option => {
  if (option === undefined) return '';

  return String(option.toFixed(2)).slice(2);
};
