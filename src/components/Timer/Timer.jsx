import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Timer.css';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      taskHour: '',
      taskMin: '',
      taskSec: '',
      startedTimer: false,
      finished: false,
    };
    this.startTimer = () => {
      const { startedTimer, finished } = this.state;
      const { timerComplited, id } = this.props;
      if (startedTimer) {
        return;
      }
      this.setState({ startedTimer: true });

      this.timer = setInterval(() => {
        const { taskHour, taskMin, taskSec } = this.state;
        let hourLeft = taskHour;
        let minLeft = taskMin;
        let secLeft = taskSec;

        if (finished) {
          timerComplited(id);
        }

        if (secLeft === 0) {
          if (minLeft === 0 && hourLeft === 0) {
            clearInterval(this.timer);
            this.setState({ startedTimer: false, finished: true });
            timerComplited(id);
          } else if (minLeft === 0 && hourLeft > 0) {
            hourLeft -= 1;
            minLeft = 59;
            secLeft = 59;
          } else if (minLeft > 0) {
            minLeft -= 1;
            secLeft = 59;
          }
        } else {
          secLeft -= 1;
        }

        this.setState({ taskHour: hourLeft, taskMin: minLeft, taskSec: secLeft });
      }, 1000);
    };
    this.pauseTimer = () => {
      this.setState({ startedTimer: false });
      clearInterval(this.timer);
    };
  }

  componentDidMount() {
    const {
      todoListData: { min, sec },
    } = this.props;

    const hours = Math.floor(min / 60);
    const fomatedMin = hours ? (min % 60) + Math.floor(sec / 60) : Math.floor(sec / 60) + +min;
    const formatedSec = sec % 60 ? sec : 0;

    this.setState({ taskHour: hours, taskMin: fomatedMin, taskSec: formatedSec });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { startedTimer, taskHour, taskMin, taskSec } = this.state;
    return (
      <span className="description">
        <button
          type="button"
          className={`icon icon-play ${startedTimer ? 'started' : null}`}
          aria-label="play"
          onClick={this.startTimer}
        />
        <button type="button" className="icon icon-pause" aria-label="pause" onClick={this.pauseTimer} />
        <span className="timer-text">{`${taskHour.toString().padStart(2, '0')}:${taskMin
          .toString()
          .padStart(2, '0')}:${taskSec.toString().padStart(2, '0')}`}</span>
      </span>
    );
  }
}

Timer.propTypes = {
  todoListData: PropTypes.object.isRequired,
};
