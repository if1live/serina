import * as React from 'react';
import * as C from '../components';

interface ComponentProps {
  match: any;
  history: any;
}
interface ComponentState {
  tid: string;
}

export class HomeContainer extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    tid: '',
  };

  handleTweetIdChange = (text: string) => {
    this.setState({
      tid: text,
    });
  }

  handleSearch = () => {
    const { tid } = this.state;
    this.props.history.push(`/serina/tweet/${tid}/`);
  }

  render() {
    const { tid } = this.state;

    return (
      <div>
        <C.SearchForm
          tid={tid}
          onChange={this.handleTweetIdChange}
          onSubmit={this.handleSearch}
        />
      </div>
    );
  }
}
