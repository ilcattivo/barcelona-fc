import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { firebase } from './firebase';
import './index.sass';

import Routes from './routes';

const App = ({ user }) => {
  return (
    <BrowserRouter>
      <Routes user={user} />
    </BrowserRouter>
  );
};

firebase.auth().onAuthStateChanged(user => {
  ReactDOM.render(<App user={user} />, document.getElementById('root'));
});
