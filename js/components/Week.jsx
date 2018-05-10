import React, {PropTypes} from 'react';
import Day from './Day';

const Week = ({today, selectedDay, days, tasks}) =>
    <div className="week">
        {
            days.map((momentDay) => {
                    const day = momentDay.startOf('day').toDate().getTime();

                    return <Day
                        date={momentDay}
                        tasks={tasks[day]}
                        isToday={momentDay.isSame(today, 'day')}
                        isSelected={momentDay.isSame(selectedDay, 'day')}
                    />

                }
            )
        }
    </div>

Week.defaultProps = {
    today: null,
    days: null,
    tasks: {}
};

Week.propTypes = {
    today: PropTypes.Moment,
    selectedDay: PropTypes.func.isRequired,
    days: PropTypes.arrayOf(PropTypes.Moment),
    tasks: PropTypes.func.isRequired,
};

export default Week;