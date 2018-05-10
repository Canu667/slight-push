import React, { Component, PropTypes } from 'react';

class Task extends Component {
    toggleCheckboxChange = () => {
        this.props.handleCheckboxChange({
            taskId: this.props.taskId,
            state: !this.props.state
        });
    };

    render() {
        return (
                    <input
                        type="checkbox"
                        value={this.props.taskId}
                        checked={this.props.state}
                        onChange={this.toggleCheckboxChange}
                    />
        );
    }
}

Task.defaultProps = {
    taskId: '',
    state: false
};

Task.propTypes = {
    taskId: PropTypes.stringValue,
    state: PropTypes.booleanValue,
    handleCheckboxChange: PropTypes.func.isRequired,
};

export default Task;