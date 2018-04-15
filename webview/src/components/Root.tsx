import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { HomeContainer } from '../containers/HomeContainer';
import { TweetContainer } from '../containers/TweetContainer';
import { SearchForm } from './SearchForm';

import {
  twitterChangeID,
} from '../actions';


interface Props extends RouteComponentProps<{}> {
  twitterChangeID: typeof twitterChangeID;
  tid: string;
}

export class Root extends React.Component<Props> {
  render() {
    const prefix = '/serina';

    return (
      <Container text>
        <h1>serina</h1>
        <h2>tweet download</h2>

        <SearchForm
          tid={this.props.tid}
          onChange={this.props.twitterChangeID}
          history={this.props.history}
        />

        <Route exact path="/" component={HomeContainer} />
        <Route exact path={`${prefix}/`} component={HomeContainer} />

        <Route path="/tweet/:tid/" component={TweetContainer} />
        <Route path={`${prefix}/tweet/:tid/`} component={TweetContainer} />
      </Container>
    );
  }
}
