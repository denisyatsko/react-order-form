export const compareObjects = (compared, current) => {
  return Object.entries(compared).some(([key, value]) => {
    return value !== current[key]
  });
};
