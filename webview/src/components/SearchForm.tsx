import * as React from 'react';
import { Button, Form, FormProps } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';
import * as H from 'history';

interface SearchFormProps {
  tid: string;
  history: H.History;
  onChange: (text: string) => void;
}

export const SearchForm = ({ tid, history, onChange }: SearchFormProps) => {
  const tweetURL = `/tweet/${tid}`;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);

  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    evt.preventDefault();
    history.push(tweetURL);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>tweet id</label>
        <input
          type="text"
          name="query"
          placeholder={Constants.SampleTweetID}
          value={tid}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Button as={Link} to={tweetURL}>fetch</Button>
      </Form.Field>
    </Form>
  );
};
