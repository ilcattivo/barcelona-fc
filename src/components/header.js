import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <nav className='navbar navbar-expand-lg navbar-dark'>
        <div className='container'>
          <NavLink to='/' className='navbar-brand'>
            FC Barcelona
          </NavLink>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink to='/team_squad' className='nav-link'>
                First Team
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/matches' className='nav-link'>
                Matches
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
