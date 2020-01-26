import React from 'react';
import './match-block.sass';

const MatchBlock = ({ match }) => {
  return (
    <div className='match-block'>
      <div className='match-block_left'>
        <div className='match-block_row'>
          <div
            className='match-block_logo'
            style={{
              backgroundImage: `url(/images/teams/${match.homeThmb}.png)`
            }}></div>
          <div className='match-block_team'>{match.home}</div>
          <div className='match-block_score'>{match.scoreHome}</div>
        </div>
        <div className='match-block_row'>
          <div
            className='match-block_logo'
            style={{
              backgroundImage: `url(/images/teams/${match.awayThmb}.png)`
            }}></div>
          <div className='match-block_team'>{match.away}</div>
          <div className='match-block_score'>{match.scoreAway}</div>
        </div>
      </div>
      <div className='match-block_right'>
        <p>
          <strong>Date:</strong> {match.date}
        </p>
        <p>
          <strong>Stadium:</strong> {match.stadium}
        </p>
        <p>
          <strong>Referee:</strong> {match.referee}
        </p>
      </div>
    </div>
  );
};

export default MatchBlock;
