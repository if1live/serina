import * as React from 'react';
import { Button, Form, FormProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { History } from 'history';

interface Props {
  id: string;
  // history: History,
  onChange: (text: string) => void;
}

const SampleTweetID = '898755978153181185';

export const SearchForm = (props: Props) => {
  const {
    id,
    onChange,
    // history,
  } = props;

  const tweetURL = `/tweet/${id}`;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);

  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    evt.preventDefault();
    // history.push(tweetURL);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>tweet id</label>
        <input
          type="text"
          name="query"
          placeholder={SampleTweetID}
          value={id}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Button as={Link} to={tweetURL}>fetch</Button>
      </Form.Field>
    </Form>
  );
};
