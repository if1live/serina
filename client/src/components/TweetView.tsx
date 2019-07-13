import React from 'react';
import { RouteComponentProps } from 'react-router';
import { SearchForm } from '.';
import { Tweet } from './Tweet';


interface Props extends RouteComponentProps<{ id: string }> {
}

export const TweetView: React.FC<Props> = (props: Props) => {
  const initialId = props.match.params.id;
  return (
    <>
      <SearchForm
        initialId={initialId}
        history={props.history}
      />
      <Tweet id={initialId} />
    </>
  );
}
