import React, { useState, useEffect } from 'react';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper } from '../../components/misc';
import { CircularProgress } from '@material-ui/core';
import MatchesList from './matchesList';
import LeagueTable from './leagueTable';
import './matches.sass';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [resultFilter, setResultFilter] = useState('All');

  useEffect(() => {
    firebaseMatches.once('value').then(snapshot => {
      const matches = firebaseLooper(snapshot);
      setMatches(matches);
      setLoading(false);
    });
  }, []);

  const buttons = {
    statusFilter: [
      { label: 'All', value: 'All' },
      { label: 'Played', value: true },
      { label: 'Not played', value: false }
    ],
    resultFilter: [
      { label: 'All', value: 'All' },
      { label: 'W', value: 'W' },
      { label: 'L', value: 'L' },
      { label: 'D', value: 'D' }
    ]
  };

  const renderButtons = (buttons, filter, setFilter) =>
    buttons.map(({ label, value }) => (
      <button
        key={label}
        className={`btn filter-box_button ${value === filter && 'active'}`}
        onClick={() => setFilter(value)}>
        {label}
      </button>
    ));

  const filterMatches = () => {
    let arr = null; // filtered matches
    // filter by match status
    if (statusFilter === 'All') arr = matches;
    else arr = matches.filter(match => match.finished === statusFilter);
    // filter by match result
    if (resultFilter === 'All') return arr;
    else return arr.filter(match => match.result === resultFilter);
  };

  if (loading) {
    return (
      <div className='matches_spinner_wrapper'>
        <CircularProgress />
      </div>
    );
  }

  const filteredMatches = filterMatches();

  return (
    <div className='matches'>
      <div className='container'>
        <div className='left'>
          <div className='matches_filters'>
            <div className='matches_filters_box filter-box'>
              <p className='filter-box_label'>Show matches</p>
              <div className='btn-group'>
                {renderButtons(
                  buttons.statusFilter,
                  statusFilter,
                  setStatusFilter
                )}
              </div>
            </div>
            <div className='matches_filters_box filter-box'>
              <p className='filter-box_label'>Show matches</p>
              <div className='btn-group'>
                {renderButtons(
                  buttons.resultFilter,
                  resultFilter,
                  setResultFilter
                )}
              </div>
            </div>
          </div>
          <MatchesList matches={filteredMatches} />
        </div>
        <div className='right'>
          <h3 className='league-table_title'>League Table</h3>
          <LeagueTable />
        </div>
      </div>
    </div>
  );
};

export default Matches;
