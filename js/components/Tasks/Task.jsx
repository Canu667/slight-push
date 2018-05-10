import React, { PropTypes } from 'react';

const Task  = ({ selectedDay, name, taskId, onAddTask, onAddPrediction }) =>
        <div className="task">
            <span className="task-label">{name}</span>
            <button type="button" className="btn btn-default btn-sm task-button-pomodoro" onClick={() => {
                onAddTask(taskId, selectedDay, name);
            }}>
                <span className="glyphicon glyphicon-plus"/> Add Pomodoro
            </button>
            <button type="button" className="btn btn-default btn-sm task-button-prediction" onClick={() => {
                onAddPrediction(taskId, selectedDay, name);
            }}>
                <span className="glyphicon glyphicon-plus"/> Add Prediction
            </button>
        </div>

Task.defaultProps = {
    selectedDay: null,
    name: '',
    taskId: null,
};

Task.propTypes = {
    selectedDay: PropTypes.Moment,
    name: PropTypes.stringValue,
    taskId: PropTypes.stringValue,
    onAddTask: PropTypes.func.isRequired,
    onAddPrediction: PropTypes.func.isRequired,
};

export default Task;