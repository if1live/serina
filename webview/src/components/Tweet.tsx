import * as React from 'react';
import * as M from '../models';
import { SearchForm } from './SearchForm';
import { DownloadView } from './DownloadView';
import { RouteComponentProps } from 'react-router';
import { Container } from 'semantic-ui-react';
import { default as TweetEmbed } from 'react-tweet-embed';
import { tweetFetch } from '../actions';

interface Props extends RouteComponentProps<{ tid: string }> {
  tweetFetch: any;

  tid: string;
  tweet: M.Tweet;
  onRequest: boolean;
  error: Error;
}

export class Tweet extends React.Component<Props> {
  componentDidMount() {
    const tid = this.props.match.params.tid;
    this.props.tweetFetch(tid);
  }

  render() {
    const view = (this.props.onRequest)
      ? this.renderRunning()
      : (this.props.tweet ? this.renderSuccess() : this.renderFailure());

    const tid = this.props.match.params.tid;

    return (
      <div>
        {view}

        <h3>preview</h3>
        <TweetEmbed id={tid} />
      </div>
    );
  }

  renderSuccess() {
    const tweet = this.props.tweet as M.Tweet;

    return (
      <div>
        <h3>download</h3>
        <DownloadView tweet={tweet} />

        <h3>media list</h3>
        <ol>
          {
            tweet.media.map((media) => {
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

  renderFailure() {
    const { error } = this.props;
    const msg = error ? error.toString() : 'blank';
    return (
      <div>error : {msg}</div>
    );
  }

  renderRunning() {
    return (
      <div>running</div>
    );
  }
}
