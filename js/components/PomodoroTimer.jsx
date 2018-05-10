import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props);
        this.onStartClick = this.onStartClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
    }

    onStartClick(e) {
        e.preventDefault();
        this.props.onStartTimer();
    }

    onStopClick(e) {
        e.preventDefault();
        this.props.onStopTimer();
    }

    render() {
        const time = moment.utc(this.props.currentPomodoroTimeMilliseconds).format('mm:ss');
        return (
            <div id="pomodoro-timer">
                <div>
                    Pomodoro Timer
                </div>
                <div className="">
                    <form>
                        <div id="pomodoro-timer-time">{time}</div>
                        <div id="pomodoro-timer-buttons">
                            <button className="button" id="pomodoro-timer-button-start" onClick={this.onStartClick}>Start</button>
                            <button className="button" id="pomodoro-timer-button-stop" onClick={this.onStopClick}>Stop</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

PomodoroTimer.defaultProps  = {
    onStartTimer: '',
    onStopTimer: '',
    currentPomodoroTimeMilliseconds: 25000,
};

PomodoroTimer.propTypes = {
    onStartTimer: PropTypes.string,
    onStopTimer: PropTypes.string,
    currentPomodoroTimeMilliseconds: PropTypes.number,
};

export default PomodoroTimer;