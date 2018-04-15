import * as React from 'react';
import { Button } from 'semantic-ui-react';
import * as M from '../models';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

const getMediaExtension = (uri: string): string => {
  // sample
  // https://pbs.twimg.com/media/DHkFxooUAAAzAry.jpg:orig
  let s = uri.split('.').pop();
  if (s) {
    s = s.replace(':orig', '');
  }
  return s || '';
};

const makeTweetJsonFileName = (id: string): string => {
  return `${id}.json`;
};

const makeTweetJson = (tweet: M.Tweet): string => {
  return JSON.stringify(tweet.dump, null, 2);
};

const DownloadTweet = ({ tweet }: { tweet: M.Tweet }) => {
  const tweetID = tweet.tweet_id;

  const handleClick = () => {
    const b = new Blob([makeTweetJson(tweet)]);
    FileSaver.saveAs(b, makeTweetJsonFileName(tweetID));
  };
  return <Button onClick={handleClick}>tweet json</Button>;
};


const DownloadZip = ({ tweet }: { tweet: M.Tweet }) => {
  const tweetID = tweet.tweet_id;

  const handleClick = async () => {
    const zip = new JSZip();
    zip.file(makeTweetJsonFileName(tweetID), makeTweetJson(tweet));

    const urls = tweet.media.map(m => m.url);
    const respList = await Promise.all(urls.map(url => fetch(url)));
    respList.map((resp, idx) => {
      const url = urls[idx];
      const mediaBlob = resp.blob();
      const ext = getMediaExtension(url);
      const mediaFileName = `${tweetID}_${idx + 1}.${ext}`;
      zip.file(mediaFileName, mediaBlob, { binary: true });
    });

    let blob = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(blob, `${tweetID}.zip`);
  };
  return <Button onClick={handleClick}>zip (tweet json + media)</Button>;
};

const UploadGoogleDrive = () => {
  const handleClick = () => {
  };
  return <Button onClick={handleClick}>google drive</Button>;
};


interface Props {
  tweet: M.Tweet;
}

export const DownloadView = (props: Props) => {
  const { tweet } = props;
  return (
    <div>
      <DownloadTweet tweet={tweet} />
      <DownloadZip tweet={tweet} />
    </div>
  );
};
