import * as React from 'react';
import './App.css';
import * as M from './models';

const MediaView = ({ media }: { media: M.Media }) => {
  return (
    <div>
      {media.type}
      <img src={media.url} />
    </div>
  );
};

const UserView = ({ user }: { user: M.User }) => {
  const link = `//twitter.com/${user.screen_name}`;

  return (
    <div>
      <a href={link} data-id={user.id} target="_blank">
        @{user.screen_name} {user.name}
      </a>
    </div>
  );
};

const SearchForm = () => {
  return (
    <form>
      <input type="text" name="query" value="898755978153181185" />
      <button type="submit">fetch</button>
    </form>
  );
};

class App extends React.Component<{}, any> {
  state: {
    tweet: M.Tweet | undefined,
  } = {
      tweet: undefined,
    };

  componentDidMount() {
    this.fetchTweet('898755978153181185');
  }

  async fetchTweet(uid: string) {
    const uri = `/fetch/${uid}.json`;
    try {
      const resp = await fetch(uri);
      const tweet = await resp.json() as M.Tweet;
      this.setState({
        tweet: tweet,
      });

    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { tweet } = this.state;

    return (
      <div>
        <SearchForm />
        {
          (tweet)
            ? <div>
              <div>
                <button type="button">download tweet</button>
                <button type="button">download zip</button>
                <button type="button">google drive</button>
              </div>

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
            </div>
            : <div>ready</div>
        }
      </div>
    );
  }
}

export default App;
