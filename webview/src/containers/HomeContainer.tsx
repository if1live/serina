import * as React from 'react';
import * as C from '../components';
import { connect } from 'react-redux';
import { State } from '../reducers';
import {
  twitterChangeID,
} from '../actions';

const mapStateToProps = (state: State) => {
  return {
    tid: state.twitter.tid,
  };
};

export const HomeContainer = connect(mapStateToProps, {
  twitterChangeID,
})(C.Home);
