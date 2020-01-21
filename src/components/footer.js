import React from 'react';
import BarcelonaLogo from './logo';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer_wrapper'>
          <BarcelonaLogo width={50} height={50} />
          <p className='footer_descr text-light'>
            FC Barcelona 2020. All rights are reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
