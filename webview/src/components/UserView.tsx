import * as React from 'react';
import * as M from '../models';

export const UserView = ({ user }: { user: M.User }) => {
  const link = `//twitter.com/${user.screen_name}`;

  return (
    <div>
      <a href={link} data-id={user.id} target="_blank">
        @{user.screen_name} {user.name}
      </a>
    </div>
  );
};
