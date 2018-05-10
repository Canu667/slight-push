import React, { Component, PropTypes } from 'react';

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmitTask(this.state.name);
        this.setState({name : ''})
    }

    render() {
        const { name } = this.state;
        return (
            <form
                className="NewTask"
            >
                <input
                    type="text"
                    value={ name }
                    placeholder="Name of new Task"
                    onChange={(event) => this.setState({ name: event.target.value })}
                />
                <button
                    onClick={this.handleSubmit}
                    disabled={!name}
                >
                    Submit
                </button>
            </form>
        );
    }
}

NewTask.defaultProps = {
    onSubmitTask: null
};

NewTask.propTypes = {
    onSubmitTask: PropTypes.func
};

export default NewTask;