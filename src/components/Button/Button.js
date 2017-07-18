import * as React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const ButtonSearchPath = ({ onSearch }) =>(
    <div className="buttonSearch">
        <RaisedButton onClick={onSearch} label="Search path" primary={true}/>
    </div>
);
ButtonSearchPath.propTypes = {
    onSearch : PropTypes.func.isRequired,
};

export default ButtonSearchPath;