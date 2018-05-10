import React, { Component, PropTypes } from 'react';

class WeekSummary extends Component {

    getFinishedTasks() {
        const tasksKeys = Object.keys(this.props.completedTasks);
        const tasks = this.props.completedTasks;

        if (tasksKeys.length === 0) {
            return [];
        }

        console.log(tasks);
        return tasksKeys.reduce((previousArray, currentDate) => {
            if (this.props.startOfTheWeek.startOf('minute').toDate().getTime() < currentDate) {
                Object.keys(tasks[currentDate]).forEach((taskId) => {
                    const completedPomodoros = tasks[currentDate][taskId].completed || {};
                    Object.keys(completedPomodoros).forEach((entryId) => {
                        previousArray.push(entryId);
                    });
                })
            }
            return previousArray;
        }, []);
    }

    getEstimates() {
        const tasks = this.props.tasks;
        const pomodoros = this.props.completedTasks;
        const estimates = {};

        Object.keys(pomodoros).forEach((date) => {
           Object.keys(pomodoros[date]).forEach((taskId) => {
               if (!estimates[taskId]) {
                   estimates[taskId] = {
                       name: tasks[taskId].name,
                       estimated: 0,
                       completed: 0,
                       percent: 0
                   }
               }

               const pomodorosEstimated = pomodoros[date][taskId].estimated || 0;
               const pomodorosCompleted = Object.keys(pomodoros[date][taskId].completed).length || 0;

               estimates[taskId].estimated += pomodorosEstimated;
               estimates[taskId].completed += pomodorosCompleted;
               estimates[taskId].percent = (estimates[taskId].completed * 100) / estimates[taskId].estimated;
           })
        });

        return estimates;
    }

    render() {
        const finishedTasks = this.getFinishedTasks();
        const estimates = this.getEstimates();

        console.log(estimates);
        console.log(this.props.completedTasks);

        return (
            <div className="week-summary">
                {Object.keys(estimates).map((taskId) =>
                    <div className="week-task">
                        <span className="week-task-label">{estimates[taskId].name}</span>
                        <span className="week-task-ratio">{estimates[taskId].estimated}/{estimates[taskId].completed}</span>
                        <span className="week-task-percent">{estimates[taskId].percent}%</span>
                    </div>
                )}
                <br/>
                <h3>Number of pomodoros: {finishedTasks.length}</h3>
                <br/>
            </div>
        );
    }
}

WeekSummary.propTypes = {
    startOfTheWeek: PropTypes.func.isRequired,
    tasks: PropTypes.func.isRequired,
    completedTasks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WeekSummary;