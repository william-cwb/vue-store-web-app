export const serialize = (data) => {
  let queryString = "";
  Object.entries(data).forEach(
    ([key, value]) => (queryString += `&${key}=${value}`)
  );

  return queryString;
};
