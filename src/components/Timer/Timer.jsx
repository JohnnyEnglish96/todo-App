import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Timer.css';

const Timer = ({ todoListData: { min, sec }, timerComplited, id }) => {
  const [[h, m, s], setTime] = useState([0, 0, 0]);
  const [startedTimer, setStartedTimer] = useState(false);
  const [finished, setFinished] = useState(false);

  const intervalRef = useRef(null);

  const startTimer = () => {
    if (h === 0 && m === 0 && s === 0) {
      setFinished(true);
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s === 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const started = () => {
    setStartedTimer(true);
  };

  const pauseTimer = () => {
    setStartedTimer(false);
  };

  useEffect(() => {
    if (!startedTimer) return clearInterval(intervalRef.current);

    if (finished) {
      clearInterval(intervalRef.current);
      setStartedTimer(false);
      return timerComplited(id);
    }

    intervalRef.current = setInterval(startTimer, 1000);

    return () => clearInterval(intervalRef.current);
  }, [startedTimer, h, m, s, finished]);

  useEffect(() => {
    const hours = Math.floor(min / 60);
    const fomatedMin = hours ? (min % 60) + Math.floor(sec / 60) : Math.floor(sec / 60) + +min;
    const formatedSec = sec % 60 ? sec : 0;

    setTime([hours, fomatedMin, formatedSec]);
  }, []);

  return (
    <span className="description">
      <button
        type="button"
        className={`icon icon-play ${startedTimer ? 'started' : null}`}
        aria-label="play"
        onClick={started}
      />
      <button type="button" className="icon icon-pause" aria-label="pause" onClick={pauseTimer} />
      <span className="timer-text">{`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
        .toString()
        .padStart(2, '0')}`}</span>
    </span>
  );
};

Timer.propTypes = {
  todoListData: PropTypes.object.isRequired,
};

export default Timer;
