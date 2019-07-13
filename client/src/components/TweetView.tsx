import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { SearchForm } from '.';
import { Tweet } from './Tweet';
import {
  TWITTER_SECRET_KEY,
  TWITTER_ACCESS_TOKEN_KEY,
} from '../constants';

interface Props extends RouteComponentProps<{ id: string }> {
}

export const TweetView: React.FC<Props> = (props: Props) => {
  const initialId = props.match.params.id;
  const accessToken = localStorage.getItem(TWITTER_ACCESS_TOKEN_KEY);
  const secretToken = localStorage.getItem(TWITTER_SECRET_KEY);

  if (!accessToken) { return <div>access token not found</div>; }
  if (!secretToken) { return <div>secret token not found</div>; }

  return (
    <>
      <SearchForm
        initialId={initialId}
        history={props.history}
      />
      <Tweet
        id={initialId}
        accessToken={accessToken}
        accessTokenSecret={secretToken}
      />
    </>
  );
}
