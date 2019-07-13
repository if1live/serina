import React, { useState } from 'react';
import _ from 'lodash';
import { ResponseData } from 'twitter';
import { default as TweetEmbed } from 'react-tweet-embed';
import { Download } from './Download';
import { makeFetchURI, extractMediaList } from '../helpers';

interface Props {
  id: string;
  accessToken: string;
  accessTokenSecret: string;
}

export const Tweet: React.FC<Props> = (props: Props) => {
  const {
    id,
  } = props;

  const [tweet, setTweet] = useState<ResponseData | Error | null>(null);
  const [onRequest, setOnRequest] = useState(false);

  React.useEffect(() => {
    request();
  }, [id]);

  async function request() {
    setOnRequest(true);
    try {
      const uri = makeFetchURI(props);
      const resp = await fetch(uri);
      if (resp.status >= 400) {
        const err = await resp.json();
        throw new Error(err.message);
      }

      const data = await resp.json();
      setTweet(data);

    } catch (err) {
      setTweet(err);
    }
    setOnRequest(false);
  }

  const view = renderTweet(tweet, onRequest);
  return (
    <div>
      {view}
      <h3>preview</h3>
      <TweetEmbed id={id} />
    </div>
  );
}

function renderTweet(tweet: ResponseData | Error | null, onRequest: boolean) {
  if (onRequest) { return TweetRunning({}); }
  if (_.isError(tweet)) { return TweetFailure({ error: tweet }); }
  if (tweet) { return TweetSuccess({ tweet }); }
  return TweetRunning({});
}

const TweetSuccess: React.FC<{ tweet: ResponseData }> = (props: { tweet: ResponseData }) => {
  const { tweet } = props;
  const mediaList = extractMediaList(tweet);

  return (
    <div>
      <h3>download</h3>
      <Download tweet={tweet} />

      <h3>media list</h3>
      <ol>
        {
          mediaList.map((media: any) => {
            return (
              <li key={media.id}>
                <a href={media.url} target="_blank">{media.url}</a>
              </li>
            );
          })
        }
      </ol>
    </div >
  );
}

const TweetFailure: React.FC<{ error: Error }> = (props: { error: Error }) => {
  const { error } = props;
  const msg = error ? error.toString() : 'blank';
  return (
    <div>error : {msg}</div>
  );
}

const TweetRunning: React.FC = () => {
  return (
    <div>running</div>
  );
}
