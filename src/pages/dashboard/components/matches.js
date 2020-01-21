import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../hoc/dashboardLayout';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../../components/misc';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseMatches.once('value').then(snapshot => {
      setLoading(false);
      setMatches(firebaseLooper(snapshot));
    });
  }, []);

  return (
    <DashboardLayout>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Match</th>
            <th scope='col'>Result</th>
            <th scope='col'>Final</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(match => (
            <tr key={match.id}>
              <td>{match.date}</td>
              <td>
                <Link to={`/admin_matches/edit/${match.id}`}>
                  {match.home} <strong>-</strong> {match.away}
                </Link>
              </td>
              <td>
                {match.scoreHome} <strong>-</strong> {match.scoreAway}
              </td>
              <td>
                {match.finished ? (
                  <span className='matches_tag_green'>Final</span>
                ) : (
                  <span className='matches_tag_red'>Not played yet</span>
                )}
              </td>
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

export default Matches;
