import React, { PropTypes } from 'react';

const ChangeWeek = ({backward, reset, forward}) =>
    <div className="changeWeek">
        <button type="button" className="glyphicon glyphicon-backward" onClick={backward}/>
        <button type="button" className="glyphicon glyphicon-stop" onClick={reset}/>
        <button type="button" className="glyphicon glyphicon-forward" onClick={forward}/>
    </div>

ChangeWeek.propTypes = {
    backward: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    forward: PropTypes.func.isRequired,
};

export default ChangeWeek;
