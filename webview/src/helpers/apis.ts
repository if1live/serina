export const makeFetchURI = (tid: string) => {
  // TODO URL?
  const prefix = 'https://w4b8r4621c.execute-api.ap-northeast-2.amazonaws.com/dev/api';
  const local = `/fetch/${tid}.json`;
  const remote = `${prefix}/fetch/${tid}`;
  if (process.env.NODE_ENV === 'development') {
    return local;
  } else {
    return remote;
  }
};
