import * as C from '../components';
import { connect } from 'react-redux';
import { State } from '../reducers';
import {
  tweetFetch,
  twitterChangeID,
} from '../actions';
import { withRouter } from 'react-router';

const mapStateToProps = (state: State) => ({
  tid: state.twitter.tid,
  tweet: state.twitter.tweet,
  onRequest: state.twitter.onRequest,
  error: state.twitter.error,
});

export const TweetContainer = withRouter(connect(mapStateToProps, {
  tweetFetch,
  twitterChangeID,
})(C.Tweet));
