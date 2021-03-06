import * as React from 'react';
import { Button } from 'semantic-ui-react';
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { ResponseData } from 'twitter';
import {
  extractMediaList,
  getMediaExtension,
} from '../helpers';

const makeTweetJsonFileName = (id: string): string => {
  return `${id}.json`;
};

const makeTweetJson = (tweet: ResponseData): string => {
  return JSON.stringify(tweet, null, 2);
};

const DownloadTweet = (props: { tweet: ResponseData }) => {
  const { tweet } = props;
  const tweetID = tweet.id_str;

  const handleClick = () => {
    const b = new Blob([makeTweetJson(tweet)]);
    FileSaver.saveAs(b, makeTweetJsonFileName(tweetID));
  };
  return <Button onClick={handleClick}>tweet json</Button>;
};


const DownloadZip = (props: { tweet: ResponseData }) => {
  const { tweet } = props;
  const tweetID = tweet.id_str;

  const handleClick = async () => {
    const zip = new JSZip();
    zip.file(makeTweetJsonFileName(tweetID), makeTweetJson(tweet));

    const mediaList = extractMediaList(tweet);
    const urls = mediaList.map(x => x.url);
    const respList = await Promise.all(urls.map(url => fetch(url)));
    for (let idx = 0; idx < respList.length; idx++) {
      const url = urls[idx];
      const resp = respList[idx];
      const mediaBlob = resp.blob();
      const ext = getMediaExtension(url);
      const mediaFileName = `${tweetID}_${idx + 1}.${ext}`;
      zip.file(mediaFileName, mediaBlob, { binary: true });
    }

    let blob = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(blob, `${tweetID}.zip`);
  };
  return <Button onClick={handleClick}>zip (tweet json + media)</Button>;
};

interface Props {
  tweet: ResponseData;
}

export const Download = (props: Props) => {
  const { tweet } = props;
  return (
    <div>
      <DownloadTweet tweet={tweet} />
      <DownloadZip tweet={tweet} />
    </div>
  );
};
