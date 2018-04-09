import * as React from 'react';
import { Button } from 'semantic-ui-react';

interface CommandViewProps {
  uid: string;
}

export class CommandView extends React.Component<CommandViewProps> {
  onDownloadTweet = () => {
  }

  onDownloadZip = () => {
  }

  onUploadGoogleDrive = () => {

  }

  render() {
    return (
      <div>
        <Button onClick={this.onDownloadTweet}>download tweet</Button>
        <Button onClick={this.onDownloadZip}>download zip</Button>
        <Button onClick={this.onUploadGoogleDrive}>google drive</Button>
      </div>
    );
  }
}
