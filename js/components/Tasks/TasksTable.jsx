import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import NewTask from './NewTask';
import Task from './Task';
import {addTaskToDay, addPredictionToDay, createTask} from '../../actions/pomodoro';

class TasksTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCreateTask: false,
        };

        this.onCreateTask = this.onCreateTask.bind(this);
    }

    onCreateTask(name) {
        const newTask = {
            name
        };

        this.props.handleCreateTask(newTask);
        this.setState({isCreateTask: !this.state.isCreateTask});
    }

    render() {
        const tasks = this.props.availableTasks || {};
        const taskKeys = Object.keys(tasks) || {};

        return (
            <div className="tasks-table-component">
                {
                    taskKeys.map((taskId) => <Task
                        selectedDay={this.props.selectedDay}
                        name={tasks[taskId].name}
                        taskId={taskId}
                        onAddTask={this.props.handleAddTask}
                        onAddPrediction={this.props.handleAddPrediction}
                        />
                    )
                }
                {
                    this.state.isCreateTask ?
                        <NewTask onSubmitTask={this.onCreateTask}/> :
                        <button className="createTask" onClick={() => {
                            this.setState({isCreateTask: !this.state.isCreateTask})
                        }}>
                            Create Task
                        </button>

                }
            </div>
        );
    }
}

TasksTable.defaultProps = {
    selectedDay: null,
};

TasksTable.propTypes = {
    selectedDay: PropTypes.Moment,
    availableTasks: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleCreateTask: PropTypes.func.isRequired,
    handleAddTask: PropTypes.func.isRequired,
    handleAddPrediction: PropTypes.func.isRequired,
};

/* eslint arrow-body-style: [0] */
const mapDispatchToProps = (dispatch) => {
    return {
        handleCreateTask: (newTask) => {
            dispatch(createTask(newTask));
        },
        handleAddTask: (taskId, date, name) => {
            dispatch(addTaskToDay(taskId, date, name));
        },
        handleAddPrediction: (taskId, date, name) => {
            dispatch(addPredictionToDay(taskId, date, name));
        }
    }
};

export default connect(null, mapDispatchToProps)(TasksTable);