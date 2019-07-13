import React from 'react';
import { RouteComponentProps } from 'react-router';
import { SearchForm } from '.';

interface Props extends RouteComponentProps<{}> {
}

export const Home: React.FC<Props> = (props: Props) => {
  return (
    <>
      <SearchForm
        initialId={''}
        history={props.history}
      />
    </>
  );
}
