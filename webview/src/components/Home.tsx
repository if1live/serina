import * as React from 'react';
import { SearchForm } from './SearchForm';

interface Props {
  twitterChangeID: any;

  tid: string;
}

export class Home extends React.Component<Props> {
  handleSearch = () => {
    //const { tid } = this.state;
    //this.props.history.push(`/serina/tweet/${tid}/`);
    // TODO
    console.log('search');
  }

  render() {
    return (
      <div>
        <SearchForm
          tid={this.props.tid}
          onChange={this.props.twitterChangeID}
          onSubmit={this.handleSearch}
        />
      </div>
    );
  }
}
