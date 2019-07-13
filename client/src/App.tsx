import React from 'react';
import { Container } from 'semantic-ui-react';
import {
  MyMenu,
  Home,
  TweetView,
} from './components';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Route } from 'react-router';

const App: React.FC = () => {

  const prefix = '/serina';

  return (
    <Container text>
      <MyMenu />

      <Route exact path="/" component={Home} />
      <Route exact path={`${prefix}/`} component={Home} />

      <Route exact path="/tweet/:id/" component={TweetView} />
      <Route exact path={`${prefix}/tweet/:id/`} component={TweetView} />
    </Container>
  );
}

export default App;

