import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../hoc/dashboardLayout';
import { firebase, firebaseDB, firebasePlayers } from '../../../firebase';
import { LinearProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import FileUploader from '../../../components/fileUploader';

const AddEditPlayer = ({ match }) => {
  const [formType, setFormType] = useState('');
  const [playerId, setPlayerId] = useState(null);
  const [playerInfo, setPlayerInfo] = useState({
    name: '',
    lastname: '',
    number: '',
    position: 'gk'
  });
  const [imageName, setImageName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formError, setFormError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const playerId = match.params.id;
    if (playerId) {
      // Switch component to Edit and recieve the data
      setFormType('Edit Player');
      setLoading(true);
      setPlayerId(playerId);
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          setLoading(false);
          const playerData = snapshot.val();
          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => setImageURL(url));
          setPlayerInfo(playerData);
        });
    } else {
      // Don't recieve anything
      setFormType('Add Player');
    }
  }, []);

  const handleInput = e => {
    const element = e.target.id;
    const value = e.target.value;
    setPlayerInfo(state => ({
      ...state,
      [element]: value
    }));
  };

  const submitForm = e => {
    e.preventDefault();
    setLoading(true);
    if (formType === 'Add Player') {
      firebasePlayers
        .push({ ...playerInfo, image: imageName })
        .then(() => {
          setRedirect(true);
        })
        .catch(() => {
          setFormError('Something went wrong');
        });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .update({ ...playerInfo, image: imageName })
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

  if (redirect) return <Redirect to='/admin_players' />;

  return (
    <DashboardLayout>
      <div className='dashboard_wrapper'>
        <h2>{formType}</h2>
        <form onSubmit={submitForm}>
          <div className='form-group' style={{ display: 'flex' }}>
            {imageURL && (
              <div className='dashboard_image-wrapper'>
                <img src={imageURL} alt='alt' />
              </div>
            )}
            <FileUploader
              dir='players'
              setFileName={setImageName}
              setFileURL={setImageURL}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>First Name</label>
            <input
              type='text'
              className='form-control'
              id='name'
              onChange={handleInput}
              value={playerInfo.name}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type='text'
              className='form-control'
              id='lastname'
              onChange={handleInput}
              value={playerInfo.lastname}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='number'>Number</label>
            <input
              type='number'
              className='form-control'
              id='number'
              onChange={handleInput}
              value={playerInfo.number}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='position'>Position</label>
            <br />
            <select
              className='custom-select'
              id='position'
              onChange={handleInput}
              value={playerInfo.position}>
              <option value='gk'>Goalkeeper</option>
              <option value='def'>Defender</option>
              <option value='mid'>Midfielder</option>
              <option value='fw'>Forward</option>
            </select>
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

export default AddEditPlayer;
