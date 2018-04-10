import * as React from 'react';
import * as M from '../models';
import { SearchForm } from './SearchForm';
import { CommandView } from './CommandView';
import { UserView } from './UserView';
import { RouteComponentProps } from 'react-router';

const MediaView = ({ media }: { media: M.Media }) => {
  return (
    <div>
      {media.type}
      <img src={media.url} />
    </div>
  );
};

interface Props extends RouteComponentProps<{ tid: string }> {
  tweetFetch: any;
  twitterChangeID: any;

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

  handleSearch = () => {
    /*
    const { tid } = this.state;
    this.props.history.push(`/serina/tweet/${tid}/`);
    this.fetchTweet(this.state.tid);
    */
  }

  render() {
    const view = (this.props.onRequest)
      ? this.renderRunning()
      : (this.props.tweet ? this.renderSuccess() : this.renderFailure());

    return (
      <div>
        <SearchForm
          tid={this.props.tid}
          onChange={this.props.twitterChangeID}
          onSubmit={this.handleSearch}
        />
        {view}
      </div>
    );
  }

  renderSuccess() {
    const tweet = this.props.tweet as M.Tweet;

    return (
      <div>
        <CommandView uid={tweet.tweet_id} />

        <a
          href={`//twitter.com/foo/status/${tweet.tweet_id}`}
          target="_blank"
        >
          goto tweet
        </a>
        <p>
          {tweet.text}
        </p>
        <UserView user={tweet.user} />
        {
          tweet.media.map((media) => {
            return (<MediaView key={media.id} media={media} />);
          })
        }
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
