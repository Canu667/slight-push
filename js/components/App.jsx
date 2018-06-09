import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
// import PomodoroTimer from './PomodoroTimer';
import Week from './Week';
import TasksTable from './Tasks/TasksTable';
import WeekSummary from './WeekSummary';
import PomodoroTimer from './PomodoroTimer';
import SignIn from './SignIn';
import SignOut from './SignOut';
// import GraphSlightEdge from './GraphSlightEdge';
import {watchUserLoginEvent} from '../actions/pomodoro';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.watchUserLoginEvent();
    }

    /* eslint no-param-reassign: [0] */
    getDayTasks() {
        const tasksKeys = Object.keys(this.props.completedTasks);
        const tasks = this.props.completedTasks;
        const availableTasks = this.props.tasks;

        if (tasksKeys.length === 0) {
            return [];
        }

        return tasksKeys.reduce((previousArray, currentDate) => {
            if (this.props.startOfTheWeek.startOf('minute').toDate().getTime() <= currentDate) {
                Object.keys(tasks[currentDate]).forEach((taskId) => {
                    if (!previousArray[currentDate]) {
                        previousArray[currentDate] = {};
                    }

                    previousArray[currentDate][taskId] = {
                        name: availableTasks[taskId].name,
                        estimated: tasks[currentDate][taskId].estimated || 0,
                        completed: tasks[currentDate][taskId].completed || []
                    };

                    return previousArray;
                })
            }
            return previousArray;
        }, []);
    }

    generateDays() {
        const startOfTheWeek = this.props.startOfTheWeek;
        const days = [];
        let day = startOfTheWeek;

        for (let i = 0; i < 7;) {
            days.push(day);
            day = day.clone().add(1, 'd');

            i += 1;
        }

        return days;
    }

    render() {
        const {today} = this.props;
        const title = `Today is ${today.format('dddd, DD-MM-YYYY')}`;
        const days = this.generateDays();

        const dayTasks = this.getDayTasks();

        return (
            <div className="app">
            {!this.props.currentUser && <SignIn />}
            {this.props.currentUser && <div className="dashboard">
                <div className="header">
                    <h1>{ title }</h1>
                    <SignOut/>
                </div>
                <Week
                    today={today}
                    days={days}
                    tasks={dayTasks}
                    selectedDay={this.props.selectedDay}
                />
                <WeekSummary
                    completedTasks={this.props.completedTasks}
                    tasks={this.props.tasks}
                    startOfTheWeek={this.props.startOfTheWeek}
                />
                { this.props.isPomodoroStarted ? <PomodoroTimer/> :
                    <TasksTable selectedDay={this.props.selectedDay} availableTasks={this.props.tasks}/> }
            </div>
            }
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.func.isRequired,
    completedTasks: PropTypes.arrayOf(PropTypes.string).isRequired,
    today: PropTypes.func.isRequired,
    selectedDay: PropTypes.func.isRequired,
    startOfTheWeek: PropTypes.func.isRequired,
    watchUserLoginEvent: PropTypes.func.isRequired,
    isPomodoroStarted: PropTypes.bool.isRequired,
    currentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        completedTasks: state.completedTasks,
        today: state.today,
        startOfTheWeek: state.startOfTheWeek,
        selectedDay: state.selectedDay,
        isPomodoroStarted: state.isPomodoroStarted,
        currentUser: state.currentUser
    }
};

/* eslint arrow-body-style: [0] */
const mapDispatchToProps = (dispatch) => {
    return {
        watchUserLoginEvent: () => {
            watchUserLoginEvent(dispatch);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);