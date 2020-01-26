import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Slide } from 'react-reveal';
import { Link } from 'react-router-dom';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper } from '../../components/misc';

import NextMatch from './nextMatch.js';

const HomeMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseMatches
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot).reverse();
        setLoading(false);
        setMatches(matches);
      });
  }, []);

  const renderMatches = matches =>
    matches.map(match => (
      <Slide bottom key={match.id}>
        <li className='match-list_item'>
          <div className='match-list_left'>
            <div className='match-list_row'>
              <div
                className='match-list_logo'
                style={{
                  backgroundImage: `url(/images/teams/${match.homeThmb}.png)`
                }}></div>
              <div className='match-list_team'>{match.home}</div>
              <div className='match-list_score'>{match.scoreHome}</div>
            </div>
            <div className='match-list_row'>
              <div
                className='match-list_logo'
                style={{
                  backgroundImage: `url(/images/teams/${match.awayThmb}.png)`
                }}></div>
              <div className='match-list_team'>{match.away}</div>
              <div className='match-list_score'>{match.scoreAway}</div>
            </div>
          </div>
          <div className='match-list_right'>
            <div className='match-list_time'>
              {match.date}
              <br />
              {match.stadium}
            </div>
          </div>
        </li>
      </Slide>
    ));
  return (
    <section className='home-matches'>
      <div className='container'>
        <NextMatch />
        <ul className='home-matches_match-list match-list'>
          {loading && <CircularProgress />}
          {renderMatches(matches)}
        </ul>
        <Link
          to='/matches'
          className='btn btn-warning mx-auto'
          style={{ width: '200px', display: 'block' }}>
          See all matches
        </Link>
      </div>
    </section>
  );
};

export default HomeMatches;
