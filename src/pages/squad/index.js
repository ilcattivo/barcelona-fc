import React, { useState, useEffect } from 'react';
import { firebaseLooper } from '../../components/misc';
import { firebase, firebasePlayers } from '../../firebase';
import './squad.sass';
import { Fade } from 'react-reveal';

const Squad = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    firebasePlayers.once('value').then(snapshot => {
      const players = firebaseLooper(snapshot);
      const promises = players.map(player => {
        return new Promise(resolve => {
          firebase
            .storage()
            .ref('players')
            .child(player.image)
            .getDownloadURL()
            .then(imageURL => {
              player.imageURL = imageURL;
              resolve();
            });
        });
      });
      Promise.all(promises).then(() => {
        setPlayers(players);
      });
    });
  }, []);

  const renderCards = pos =>
    players
      .filter(player => player.position === pos)
      .map((player, i) => (
        <Fade left delay={i * 50} key={i}>
          <div className='squad_card player-card'>
            <div
              className='player-card_img'
              style={{
                background: `url(${player.imageURL}) no-repeat center bottom / 80% rgba(159,1,47,0.3)`
              }}></div>
            <div className='player-card_info'>
              <div className='player-card_name'>
                {player.name} {player.lastname}
              </div>
              <div className='player-card_number'>{player.number}</div>
            </div>
          </div>
        </Fade>
      ));

  return (
    <main className='squad'>
      <div className='squad_block_wrapper'>
        <h3 className='squad_title'>Goalkeepers</h3>
        <div className='squad_cards'>{renderCards('gk')}</div>
      </div>
      <div className='squad_block_wrapper'>
        <h3 className='squad_title'>Defenders</h3>
        <div className='squad_cards'>{renderCards('def')}</div>
      </div>
      <div className='squad_block_wrapper'>
        <h3 className='squad_title'>Midfielders</h3>
        <div className='squad_cards'>{renderCards('mid')}</div>
      </div>
      <div className='squad_block_wrapper'>
        <h3 className='squad_title'>Forwards</h3>
        <div className='squad_cards'>{renderCards('fw')}</div>
      </div>
    </main>
  );
};

export default Squad;
