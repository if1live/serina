import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6uzrv7S9DuRkgyswaAiE1NmGasCUkezQ",
  authDomain: "serina-dfa02.firebaseapp.com",
  databaseURL: "https://serina-dfa02.firebaseio.com",
  projectId: "serina-dfa02",
  storageBucket: "",
  messagingSenderId: "705473550769",
  appId: "1:705473550769:web:374d2e571c3115aa"
};
firebase.initializeApp(firebaseConfig);

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
