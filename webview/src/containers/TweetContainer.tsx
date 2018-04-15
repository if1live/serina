import * as C from '../components';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { withRouter } from 'react-router';
import {
  tweetFetch,
  twitterChangeID,
} from '../actions';


const mapStateToProps = (state: State) => ({
  tid: state.twitter.tid,
  tweet: state.twitter.tweet,
  onRequest: state.twitter.onRequest,
  error: state.twitter.error,
});

export const TweetContainer = withRouter(connect(mapStateToProps, {
  tweetFetch,
})(C.Tweet));
