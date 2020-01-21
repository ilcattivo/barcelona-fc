import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../hoc/dashboardLayout';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../../components/misc';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebasePlayers.once('value').then(snapshot => {
      setLoading(false);
      setPlayers(firebaseLooper(snapshot));
    });
  }, []);

  return (
    <DashboardLayout>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Number</th>
            <th scope='col'>Name</th>
            <th scope='col'>Lastname</th>
            <th scope='col'>Position</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.number}</td>
              <td>
                <Link to={`/admin_players/edit/${player.id}`}>
                  {player.name}
                </Link>
              </td>
              <td>
                <Link to={`/admin_players/edit/${player.id}`}>
                  {player.lastname}
                </Link>
              </td>
              <td>{player.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <div className='loader_wrapper'>
          <CircularProgress />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Players;
