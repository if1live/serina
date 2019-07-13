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
  const toMedia = (media: any) => {
    const url = media.type === 'video'
      ? media.video_info.variants[0].url
      : media.media_url_https;
    return {
      id: media.id_str,
      type: media.type,
      url,
    };
  };
  const rawMedia: any[] = tweet.extended_entities.media;
  const mediaList = rawMedia.map(toMedia);
  return mediaList;
}

const simpleRe = /^\d+$/;
const statusRe = /\/.+\/status\/(\d+)/;
const urlRe = /twitter\.com\/.+\/status\/(\d+)/;

export function sanitize(input: string) {
  const s = input.trim();

  if (simpleRe.test(s)) { return s; }

  try {
    const url = new URL(s);
    if (!url.host.endsWith('twitter.com')) {
      return undefined;
    }

    const m = statusRe.exec(url.pathname);
    if (m) { return m[1]; }
    return undefined;

  } catch (err) {
    // http, https 안붙은 URL은 url 처리 실패
  }

  const m = urlRe.exec(s);
  if (m) { return m[1]; }

  return undefined;
}
