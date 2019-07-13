import React from 'react';
import { Container } from 'semantic-ui-react';
import {
  MyMenu,
  SearchForm,
  Tweet,
} from './components';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { RouteComponentProps } from 'react-router';

export const prefix = '/serina';

interface Props extends RouteComponentProps<{}> {
}

const App: React.FC<Props> = (props: Props) => {
  const params = new URLSearchParams(window.location.search);
  const initialId: string | null = params.get("id");

  return (
    <Container text>
      <MyMenu />
      <SearchForm initialId={initialId} history={props.history} />
      {initialId ? <Tweet id={initialId} /> : null}
    </Container>
  );
}

export default App;

