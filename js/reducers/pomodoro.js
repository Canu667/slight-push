import { combineReducers } from 'redux'
import { ADD_TASK, GET_TASKS, GET_COMPLETED_TASKS, SELECT_DAY, TOGGLE_POMODORO, CHANGE_USER, CHANGE_WEEK } from '../actions/pomodoro';
import initialState from '../initialState';

function completedTasks(doneTasks = initialState.completedTasks, action) {
    switch (action.type) {
        // case TOGGLE_TASK: {
        //     const index = doneTasks.indexOf(action.task);
        //     if (index === -1) {
        //         doneTasks.push(action.task)
        //     } else {
        //         doneTasks.splice(index, 1);
        //     }
        //     return Object.assign([], doneTasks);
        // }
        case GET_COMPLETED_TASKS:
            return Object.assign({}, action.completedTasks);
        default:
            return doneTasks
    }
}

function today(state = initialState.today) {
    return state;
}

function currentUser(state = initialState.currentUser, action) {
    switch (action.type) {
        case CHANGE_USER: {
            return action.currentUser;
        }
        default:
            return state;
    }
}

function selectedDay(state = initialState.selectedDay, action) {
    switch (action.type) {
        case SELECT_DAY: {
            return action.date;
        }
        default:
            return state;
    }
}

function startOfTheWeek(state = initialState.startOfTheWeek, action) {
    switch (action.type) {
        case CHANGE_WEEK: {
            return action.startOfTheWeek;
        }
        default:
            return state;
    }
}

function isPomodoroStarted(state = initialState.isPomodoroStarted, action) {
    switch (action.type) {
        case TOGGLE_POMODORO: {
            return !state;
        }
        default:
            return state;
    }
}

function tasks(state = initialState.tasks, action) {
    switch (action.type) {
        case ADD_TASK: {
            return action.task;
        }
        case GET_TASKS:
            return Object.assign({}, action.tasks);
        default:
            return state;
    }
}

const slightEdgeApp = combineReducers({
    today,
    startOfTheWeek,
    completedTasks,
    tasks,
    selectedDay,
    isPomodoroStarted,
    currentUser
});

export default slightEdgeApp