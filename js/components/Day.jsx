import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { toggleTask, selectDay } from '../actions/pomodoro';

class Day extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: this.props.tasks,
            isToday: false
        };
        this.handleTaskState = this.props.handleTaskState.bind(this);
        this.handleSelectDay = this.props.handleTaskState.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(taskDetails) {
        this.handleTaskState({
            taskId: taskDetails.taskId,
            state: taskDetails.state,
            date: this.props.date
        });
    }

    /* eslint no-param-reassign: [0] */
    prepareTaskLabels() {
        return Object.keys(this.props.tasks).reduce((taskLabels, taskId) => {

            const nameKey = this.props.tasks[taskId].name;
            const completedSigns = Object.keys(this.props.tasks[taskId].completed).length;
            const estimated = this.props.tasks[taskId].estimated - completedSigns;

            if (!taskLabels[nameKey]) {
                taskLabels[nameKey] = {
                    name: nameKey,
                    completedSigns: 0,
                    estimatedSigns: 0,
                }
            }

            taskLabels[nameKey].completedSigns = new Array(completedSigns).fill(0);
            taskLabels[nameKey].estimatedSigns = new Array(estimated < 0 ? 0 : estimated).fill(0);

            return taskLabels;
        }, {});
    }

    render() {
        const classes = (this.props.isToday ? 'day today' : 'day') + (this.props.isSelected ? ' selected-day' : '');
        const taskLabels = this.prepareTaskLabels();

        return (
                <div className={classes} onClick={() => {
                    this.props.handleSelectDay(this.props.date);
                }} role="button" tabIndex="0">
                    <div>
                        {this.props.date.format('dddd, DD-MM-YYYY')}
                    </div>
                    <hr/>
                    <div>
                        <div className="tasks">
                            {
                                Object.keys(taskLabels).map((taskId) =>
                                        <div className="day-task">
                                            <span className="day-task-label">
                                                {taskLabels[taskId].name}
                                            </span>
                                            <span className="day-task-signs">
                                            {taskLabels[taskId].estimatedSigns.map(() =><span className="glyphicon glyphicon-ok-sign unfinished"/>)}
                                            {taskLabels[taskId].completedSigns.map(() =><span className="glyphicon glyphicon-ok-sign"/>)}
                                            </span>
                                        </div>
                                        )
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

Day.defaultProps  = {
    date: '',
    tasks: [],
    isToday: false,
    isSelected: false
};

Day.propTypes = {
    date: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.string),
    isToday: PropTypes.booleanValue,
    isSelected: PropTypes.booleanValue,
    handleTaskState: PropTypes.func.isRequired,
    handleSelectDay: PropTypes.func.isRequired,
};

/* eslint arrow-body-style: [0] */
const mapDispatchToProps = (dispatch) => {
    return {
        handleTaskState: (task) => {
            dispatch(toggleTask(task))
        },
        handleSelectDay: (date) => {
            dispatch(selectDay(date));
        }
    }
};

export default connect(null, mapDispatchToProps)(Day);