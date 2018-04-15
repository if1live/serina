import * as React from 'react';
import { Root } from '../components/Root';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  twitterChangeID,
} from '../actions';
import { State } from '../reducers';


const mapStateToProps = (state: State) => ({
  tid: state.twitter.tid,
});


export const RootContainer = withRouter(connect(mapStateToProps, {
  twitterChangeID,
})(Root));
