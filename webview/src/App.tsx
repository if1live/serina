import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { HomeContainer, TweetContainer } from './containers';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { history } from './helpers/history';


const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/serina" component={HomeContainer} />

        <Route path="/tweet/:tid/" component={TweetContainer} />
        <Route path="/serina/tweet/:tid/" component={TweetContainer} />
      </div>
    </Router>
  );
};

export default AppRouter;
