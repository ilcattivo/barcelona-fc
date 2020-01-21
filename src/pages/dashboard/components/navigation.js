import React from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../../../firebase';

const Navigation = () => {
  const links = [
    {
      title: 'Matches',
      linkTo: '/admin_matches'
    },
    {
      title: 'Add Match',
      linkTo: '/admin_matches/add'
    },
    {
      title: 'Players',
      linkTo: '/admin_players'
    },
    {
      title: 'Add Player',
      linkTo: '/admin_players/add'
    }
  ];

  const renderLinks = () =>
    links.map(({ title, linkTo }) => (
      <li className='list-group-item' key={title}>
        <Link to={linkTo}>{title}</Link>
      </li>
    ));

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <nav className='admin-nav'>
      <ul className='list-group list-group-flush'>
        {renderLinks()}
        <li className='list-group-item'>
          <Link onClick={logOut}>Log Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
