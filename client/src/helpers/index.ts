import { ResponseData } from "twitter";

export const makeFetchURI = (opts: {
  id: string,
  accessToken: string,
  accessTokenSecret: string,
}) => {
  const {
    id,
    accessToken,
    accessTokenSecret,
  } = opts;

  // TODO URL?
  const prefix = 'https://w4b8r4621c.execute-api.ap-northeast-2.amazonaws.com/dev';
  // TODO
  const qs = `id=${id}&access_token_key=${accessToken}&access_token_secret=${accessTokenSecret}`;
  const local = `${prefix}/show?${qs}`;
  const remote = `${prefix}/show?${qs}`;
  if (process.env.NODE_ENV === 'development') {
    return local;
  } else {
    return remote;
  }
};

export function extractMediaList(tweet: ResponseData) {
  const toMedia = (media: any) => ({
    id: media.id_str,
    url: media.media_url_https,
  });
  const rawMedia: any[] = tweet.entities.media;
  const mediaList = rawMedia.map(toMedia);
  return mediaList;
}
