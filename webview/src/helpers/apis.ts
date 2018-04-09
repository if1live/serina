export const makeFetchURI = (tid: string) => {
  // TODO URL?
  if (process.env.NODE_ENV === 'development') {
    return `/fetch/${tid}.json`;
  } else {
    return `/serina/fetch/${tid}.json`;
  }
};
