import * as React from 'react';
import * as M from '../models';
import * as C from '../components';
import * as Apis from '../helpers/apis';

const MediaView = ({ media }: { media: M.Media }) => {
  return (
    <div>
      {media.type}
      <img src={media.url} />
    </div>
  );
};


interface ComponentProps {
  match: any;
  history: any;
}
interface ComponentState {
  tid: string;

  onRequest: boolean;
  tweet: M.Tweet | undefined;
  error: Error | undefined;
}


export class TweetContainer extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);

    const { match } = this.props;
    this.state = {
      tid: match.params.tid,
      onRequest: false,
      tweet: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    this.fetchTweet(this.state.tid);
  }

  async fetchTweet(uid: string) {
    const uri = Apis.makeFetchURI(uid);

    this.setState({
      onRequest: true,
      tweet: undefined,
      error: undefined,
    });

    try {
      const resp = await fetch(uri);
      const tweet = await resp.json() as M.Tweet;
      this.setState({
        onRequest: false,
        tweet: tweet,
        error: undefined,
      });

    } catch (err) {
      console.error(err);
      this.setState({
        onRequest: false,
        tweet: undefined,
        error: err,
      });
    }
  }

  handleTweetIdChange = (text: string) => {
    this.setState({
      tid: text,
    });
  }

  handleSearch = () => {
    const { tid } = this.state;
    this.props.history.push(`/serina/tweet/${tid}/`);
    this.fetchTweet(this.state.tid);
  }

  render() {
    const { tid, tweet } = this.state;
    const view = (this.state.onRequest)
      ? this.renderRunning()
      : (this.state.tweet ? this.renderSuccess() : this.renderFailure());

    return (
      <div>
        <C.SearchForm
          tid={tid}
          onChange={this.handleTweetIdChange}
          onSubmit={this.handleSearch}
        />
        {view}
      </div>
    );
  }

  renderSuccess() {
    const tweet = this.state.tweet as M.Tweet;

    return (
      <div>
        <C.CommandView uid={tweet.tweet_id} />

        <a
          href={`//twitter.com/foo/status/${tweet.tweet_id}`}
          target="_blank"
        >
          goto tweet
        </a>
        <p>
          {tweet.text}
        </p>
        <C.UserView user={tweet.user} />
        {
          tweet.media.map((media) => {
            return (<MediaView key={media.id} media={media} />);
          })
        }
      </div >
    );
  }

  renderFailure() {
    const { error } = this.state;
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
