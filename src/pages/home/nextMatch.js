import React, { useState, useEffect } from 'react';

const NextMatch = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [timer, setTimer] = useState();

  const startCountdown = () => {
    const deadline = 'Feb, 5, 2020';

    const timer = setInterval(() => {
      const time = Date.parse(deadline) - new Date();
      if (time > 0) {
        setSeconds(Math.floor((time / 1000) % 60));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setHours(Math.floor((time / 1000 / 3600) % 60));
        setDays(Math.floor(time / 1000 / 3600 / 24));
      }
    }, 1000);

    setTimer(timer);
  };

  useEffect(() => {
    startCountdown();
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className='countdown'>
        <h2 className='home-matches_header'>Barca First Team Matches</h2>
        <div className='countdown_header'>Next Match</div>
        <div className='countdown_clock'>
          <div className='countdown_days'>
            <div className='countdown_count'>{days}</div>
            <div className='countdown_label'>days</div>
          </div>
          <div>
            <div className='countdown_hours'>
              <div className='countdown_count'>{hours}</div>
              <div className='countdown_label'>hours</div>
            </div>
          </div>
          <div className='countdown_minutes'>
            <div className='countdown_count'>{minutes}</div>
            <div className='countdown_label'>minutes</div>
          </div>
          <div className='countdown_minutes'>
            <div className='countdown_count'>{seconds}</div>
            <div className='countdown_label'>seconds</div>
          </div>
        </div>
      </div>
      <div className='next-match'>
        <div className='next-match_home-logo'></div>
        <div className='next-match_info'>
          <div className='next-match_competition'></div>
          <div className='next-match_time kickoff'>
            <div className='kickoff_text'>Kickoff CET</div>
            <div className='kickoff_value'>19:00</div>
          </div>
          <div className='next-match_teams'>
            <span className='next-match_home-team'>FC Barcelona</span>
            <span className='next-match_versus'>V</span>
            <span className='next-match_away-team'>Granada</span>
          </div>
          <div className='next-match_stadium'>Camp Nou</div>
          <div className='btn btn-warning'>Tickets</div>
        </div>
        <div className='next-match_away-logo'></div>
      </div>
    </>
  );
};

export default NextMatch;
