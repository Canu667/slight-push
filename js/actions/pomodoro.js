import {database, auth} from '../firebase';

let tasksRef = null;
let completedTasksRef = null;
let loggedUser = null;

export const GET_TASKS = 'GET_TASKS';
export const GET_COMPLETED_TASKS = 'GET_COMPLETED_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const ADD_POMODORO = 'ADD_POMODORO';
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_TO_DAY = 'ADD_TASK_TO_DAY';
export const ADD_PREDICTION_TO_DAY = 'ADD_PREDICTION_TO_DAY';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const SELECT_DAY = 'SELECT_DAY';
export const TOGGLE_POMODORO = 'TOGGLE_POMODORO';
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_WEEK = 'CHANGE_WEEK';

/*
 * action creators
 */

export function addPomodoro(task) {
    confirm("Did you do a Pomodoro?");
    return { type: ADD_POMODORO, task }
}

export function changeWeek(startOfTheWeek) {
    return { type: CHANGE_WEEK, startOfTheWeek }
}

export function selectDay(date) {
    return { type: SELECT_DAY, date }
}

export function createTask(newTask) {
    tasksRef.push({name: newTask.name});

    return { type: CREATE_TASK, newTask }
}

export function addTaskToDay(taskId, date, name) {
    const key = date.startOf('day').toDate().getTime();
    completedTasksRef.child(key).child(taskId).child('completed').push({name});

    return { type: ADD_TASK_TO_DAY, task: {name, taskId} }
}

export function addPredictionToDay(taskId, date, name) {
     const key = date.startOf('day').toDate().getTime();
     completedTasksRef.child(key).child(taskId).child('estimated').transaction((currentClicks) => (currentClicks || 0) + 1);

    return { type: ADD_PREDICTION_TO_DAY, task: {name, taskId} }
}

export function startPomodoro(taskId, date, name) {
    return { type: TOGGLE_POMODORO, pomodoro: {name, date, taskId} }
}

export function toggleTask(task) {
    const key = task.date.startOf('minute').toDate().getTime();
    tasksRef.child(key).child(task.taskId).update({state: task.state});

    return { type: TOGGLE_TASK, task }
}

export const getTasks = (tasks) => ({type: GET_TASKS, tasks})
export const getCompletedTasks = (completedTasks) => ({type: GET_COMPLETED_TASKS, completedTasks})
export const addTask = (task) => ({type: ADD_TASK, task})

/**
 * THUNKS
 */
export function getTasksThunk() {
    return dispatch => {
        if(loggedUser) {
            tasksRef.once('value', snap => {
                dispatch(getTasks(snap.val()));
            })
        }
    }
}

export function getCompletedTasksThunk() {
    return dispatch => {
        if(loggedUser) {
            completedTasksRef.once('value', snap => {
                dispatch(getCompletedTasks(snap.val()));
            })
        }
    }
}

export function watchTaskAddedEvent(dispatch) {
        return tasksRef.on('value', (snap) => {
            dispatch(addTask(snap.val()));
        });
}

export function watchTaskFinishedEvent(dispatch) {
    return completedTasksRef.on('value', (snap) => {
        dispatch(getCompletedTasks(snap.val()));
    });
}

export const changeUser = (currentUser, dispatch) => {
    loggedUser = currentUser;

    tasksRef = null;
    completedTasksRef = null;

    if (loggedUser) {
        tasksRef = database.ref(loggedUser.uid).child('tasks');
        completedTasksRef = database.ref(loggedUser.uid).child('completedTasks');

        getTasksThunk();
        getCompletedTasksThunk();
        watchTaskAddedEvent(dispatch);
        watchTaskFinishedEvent(dispatch);
    }

    return {type: CHANGE_USER, currentUser}
}

export function watchUserLoginEvent(dispatch) {
    auth.onAuthStateChanged((currentUser) => {
        dispatch(changeUser(currentUser, dispatch));
    })
}