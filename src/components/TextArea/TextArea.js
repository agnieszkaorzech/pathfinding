import * as React from "react";
import TextField from "material-ui/TextField";

const TextArea = ({value, floatingLabelText, onChange}) => (
    <div style={{alignSelf: 'center'}}>
        <TextField onChange={onChange} defaultValue={value} floatingLabelText={floatingLabelText}/>
    </div>
);

export default TextArea;