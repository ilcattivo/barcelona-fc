import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../hoc/dashboardLayout';
import { firebaseDB, firebaseMatches } from '../../../firebase';
import { LinearProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const AddEditMatch = ({ match }) => {
  const [formType, setFormType] = useState('');
  const [matchId, setMatchId] = useState(null);
  const [matchInfo, setMatchInfo] = useState({
    tournament: 'la_liga',
    date: '',
    home: '',
    homeThmb: '',
    scoreHome: '',
    away: '',
    awayThmb: '',
    scoreAway: '',
    referee: '',
    result: 'n/a',
    stadium: '',
    finished: ''
  });
  const [loading, setLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formError, setFormError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const matchId = match.params.id;
    if (matchId) {
      // Switch component to Edit and recieve the data
      setFormType('Edit Match');
      setLoading(true);
      setMatchId(matchId);
      firebaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then(snapshot => {
          setLoading(false);
          setMatchInfo(snapshot.val());
        });
    } else {
      // Don't recieve anything
      setFormType('Add Match');
    }
  }, []);

  const handleInput = e => {
    const element = e.target.id;
    const value = e.target.value;
    setMatchInfo(state => ({
      ...state,
      [element]: value
    }));
  };

  const submitForm = e => {
    e.preventDefault();
    setLoading(true);
    if (formType === 'Add Match') {
      firebaseMatches
        .push(matchInfo)
        .then(() => {
          setRedirect(true);
        })
        .catch(() => {
          setFormError('Something went wrong');
        });
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .update(matchInfo)
        .then(() => {
          setLoading(false);
          setFormSuccess('Updated correctly');
          setTimeout(() => {
            setFormSuccess(null);
          }, 2000);
        })
        .catch(() => {
          setLoading(false);
          setFormError('Something went wrong');
        });
    }
  };

  if (redirect) return <Redirect to='/admin_matches' />;

  return (
    <DashboardLayout>
      <div className='dashboard_wrapper'>
        <h2>{formType}</h2>
        <form onSubmit={submitForm}>
          <div className='form-group'>
            <label htmlFor='tournament'>Select a tournament</label>
            <br />
            <select
              className='custom-select'
              id='tournament'
              onChange={handleInput}
              value={matchInfo.tournament}>
              <option value='la_liga'>La Liga</option>
              <option value='champions_league'>Champions League</option>
              <option value='spanish_cup'>Spanish Cup</option>
              <option value='spanish_supercup'>Spanish Supercup</option>
              <option value='friendly'>Friendly</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Select a date</label>
            <input
              type='date'
              className='form-control'
              id='date'
              onChange={handleInput}
              value={matchInfo.date}
            />
          </div>
          <div className='form-row'>
            <div className='col-3 form-group'>
              <label htmlFor='home'>Home team</label>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  id='home'
                  placeholder='Home team'
                  onChange={handleInput}
                  value={matchInfo.home}
                />
                <div className='input-group-append'>
                  <input
                    type='number'
                    className='form-control'
                    id='scoreHome'
                    placeholder='Score'
                    onChange={handleInput}
                    value={matchInfo.scoreHome}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-3 form-group'>
              <label htmlFor='stadium'>Home thmb</label>
              <input
                type='text'
                className='form-control'
                id='homeThmb'
                onChange={handleInput}
                value={matchInfo.homeThmb}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='col-3 form-group'>
              <label htmlFor='away'>Away team</label>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  id='away'
                  placeholder='Away team'
                  onChange={handleInput}
                  value={matchInfo.away}
                />
                <div className='input-group-append'>
                  <input
                    type='number'
                    className='form-control'
                    id='scoreAway'
                    placeholder='Score'
                    onChange={handleInput}
                    value={matchInfo.scoreAway}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-3 form-group'>
              <label htmlFor='stadium'>Away thmb</label>
              <input
                type='text'
                className='form-control'
                id='awayThmb'
                onChange={handleInput}
                value={matchInfo.awayThmb}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='col-md-3 form-group'>
              <label htmlFor='stadium'>Stadium</label>
              <input
                type='text'
                className='form-control'
                id='stadium'
                onChange={handleInput}
                value={matchInfo.stadium}
              />
            </div>
            <div className='col-md-3 form-group'>
              <label htmlFor='referee'>Referee</label>
              <input
                type='text'
                className='form-control'
                id='referee'
                onChange={handleInput}
                value={matchInfo.referee}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='col-md-3 form-group'>
              <label htmlFor='result'>Result</label>
              <br />
              <select
                className='custom-select'
                id='result'
                onChange={handleInput}
                value={matchInfo.result}>
                <option value='n/a'>n/a</option>
                <option value='W'>Win</option>
                <option value='D'>Draw</option>
                <option value='L'>Lose</option>
              </select>
            </div>
            <div className='col-md-3 form-group'>
              <label htmlFor='finished'>Finished</label>
              <br />
              <select
                className='custom-select'
                id='finished'
                onChange={handleInput}
                value={matchInfo.finished}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>
          <button className='btn btn-primary'>Submit</button>
          <div
            style={{
              display: 'inline-block',
              marginLeft: '20px'
            }}>
            {loading && <LinearProgress style={{ width: '50px' }} />}
            <p className='text-success'>{formSuccess}</p>
            <p className='text-danger'>{formError}</p>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddEditMatch;
