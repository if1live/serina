import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import firebase from 'firebase';
import {
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_SECRET_KEY,
} from '../constants';

export const MyMenu: React.FC = () => {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [error, setError] = useState<Error | null>(null);

  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  async function handleSignIn() {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

      const provider = new firebase.auth.TwitterAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      setUser(result.user);

      const credential = result.credential! as firebase.auth.OAuthCredential;
      localStorage.setItem(TWITTER_ACCESS_TOKEN_KEY, credential.accessToken!);
      localStorage.setItem(TWITTER_SECRET_KEY, credential.secret!);

    } catch (err) {
      setError(err);
    }
  };

  async function handleSingOut() {
    localStorage.removeItem(TWITTER_ACCESS_TOKEN_KEY);
    localStorage.removeItem(TWITTER_SECRET_KEY);
    await firebase.auth().signOut();
  }

  return (
    <Menu>
      <Menu.Item>
        <a href="/serina">serina</a>
      </Menu.Item>

      {(() => {
        if (error) {
          return (
            <Menu.Item>
              Error!
            </Menu.Item>
          );

        } else if (user) {
          return (
            <>
              <Menu.Item>
                <img src={user.photoURL!} />
                <span>{user.displayName}</span>
              </Menu.Item>
              <Menu.Item onClick={handleSingOut}>
                <Icon name="sign out" />
                Sign Out
              </Menu.Item>
            </>
          );

        } else {
          return (
            <Menu.Item
              name="sign in"
              onClick={handleSignIn}>
              Sign In
            </Menu.Item>
          );
        }
      })()}
    </Menu>
  )
}
