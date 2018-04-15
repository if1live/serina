import * as React from 'react';
import * as C from '../components';
import { connect } from 'react-redux';
import { State } from '../reducers';

const mapStateToProps = (state: State) => ({
});

export const HomeContainer = connect(mapStateToProps, {
})(C.Home);
