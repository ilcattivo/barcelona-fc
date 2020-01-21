import React from 'react';
import Featured from './featured';
import HomeMatches from './homeMatches';
import Promotion from './promotion';
import './home.sass';

const Home = () => {
  return (
    <main className='home'>
      <Featured />
      <HomeMatches />
      <Promotion />
    </main>
  );
};

export default Home;
