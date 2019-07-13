import React, { useState } from 'react';
import { Button, Form, FormProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { sanitize } from '../helpers';
import { History } from 'history';
import { prefix } from '../App';

interface Props {
  initialId: string | null;
  history: History;
}

const SampleTweetID = '898755978153181185';

export const SearchForm = (props: Props) => {
  const {
    initialId,
    history,
  } = props;

  const [input, setInput] = useState<string>(initialId || '');

  const id = sanitize(input);
  const tweetURL = id ? `${prefix}?id=${id}` : prefix;
  const available = !!id;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    if (!available) { return; }
    evt.preventDefault();
    history.push(tweetURL);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field error={!available}>
        <label>tweet id</label>
        <input
          type="text"
          name="query"
          placeholder={SampleTweetID}
          value={input}
          onChange={handleChange}
          autoComplete="off"
        />
      </Form.Field>
      <Form.Field>
        <Button
          as={Link}
          to={tweetURL}
          positive={available}
          negative={!available}
        >
          fetch
        </Button>
        <Button onClick={handleClear}>clear</Button>
      </Form.Field>
    </Form>
  );
};
