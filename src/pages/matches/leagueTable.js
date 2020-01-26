import React, { useState, useEffect } from 'react';
import { firebasePositions } from '../../firebase';
import { firebaseLooper } from '../../components/misc';

const LeagueTable = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    firebasePositions.once('value').then(snapshot => {
      setPositions(firebaseLooper(snapshot));
    });
  }, []);

  return (
    <table className='table league-table'>
      <thead>
        <tr>
          <th scope='col'>Pos</th>
          <th scope='col'>Team</th>
          <th scope='col'>Played</th>
          <th scope='col'>W</th>
          <th scope='col'>L</th>
          <th scope='col'>D</th>
          <th scope='col'>Pts</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position, i) => (
          <tr key={position.team}>
            <td>{i + 1}</td>
            <td>{position.team}</td>
            <td>{position.p}</td>
            <td>{position.w}</td>
            <td>{position.d}</td>
            <td>{position.l}</td>
            <td>{position.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeagueTable;
