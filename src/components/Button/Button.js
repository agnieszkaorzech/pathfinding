import * as React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

const ButtonSearchPath = ({onSearch, label}) => (
    <div className="buttonSearch" style={{alignSelf: 'center', padding: '20px 0 5px 0'}}>
        <RaisedButton style={{width: '200px'}} onClick={onSearch} label={label} secondary={true}/>
    </div>
);
ButtonSearchPath.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default ButtonSearchPath;