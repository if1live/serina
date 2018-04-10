import * as React from 'react';
import { SearchForm } from './SearchForm';

interface Props {
  twitterChangeID: any;

  tid: string;
}

export class Home extends React.Component<Props> {
  render() {
    return (
      <div>
        <SearchForm
          tid={this.props.tid}
          onChange={this.props.twitterChangeID}
        />
      </div>
    );
  }
}
