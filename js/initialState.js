import moment from 'moment';

const today = moment(new Date());
const initialState = {
    today,
    startOfTheWeek: moment().startOf('week').isoWeekday(6),
    numberOfCompletedPomodoros: 0,
    completedTasks: {},
    tasks:{},
    selectedDay: today,
};

export default initialState;