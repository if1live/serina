import React, { useState } from 'react';
import { Button, Form, FormProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { sanitize } from '../helpers';
import { History } from 'history';

interface Props {
  initialId: string;
  history: History,
}

const SampleTweetID = '898755978153181185';

export const SearchForm = (props: Props) => {
  const {
    initialId,
    history,
  } = props;

  const [input, setInput] = useState<string>(initialId);

  const id = sanitize(input);
  const tweetURL = `/tweet/${id}`;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);

  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    evt.preventDefault();
    history.push(tweetURL);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field error={id === undefined}>
        <label>tweet id</label>
        <input
          type="text"
          name="query"
          placeholder={SampleTweetID}
          value={input}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Button as={Link} to={tweetURL}>fetch</Button>
      </Form.Field>
    </Form>
  );
};
