import moment from 'moment';

const today = moment(new Date());
const initialState = {
    today,
    startOfTheWeek: moment(new Date()).startOf('week').isoWeekday(6),
    numberOfCompletedPomodoros: 0,
    completedTasks: {},
    tasks:{},
    selectedDay: today,
    isPomodoroStarted: false,
    currentUser: null
};

export default initialState;