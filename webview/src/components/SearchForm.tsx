import * as React from 'react';
import { Button, Form, FormProps } from 'semantic-ui-react';
import * as Constants from '../constants';

interface SearchFormProps {
  tid: string;
  onChange: (text: string) => void;
  onSubmit: () => void;

}

export const SearchForm = ({ tid, onChange, onSubmit }: SearchFormProps) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);

  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    onSubmit();
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
        <Button type="submit">fetch</Button>
      </Form.Field>
    </Form>
  );
};