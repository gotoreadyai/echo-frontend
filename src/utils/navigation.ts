export const getUSParam = (param: string) => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(param);
};
