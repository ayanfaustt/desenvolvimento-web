import React from 'react';
import './styles.css';
import TextField from '../textField';

interface TextInputProps {
    name: string,
}

export default function TextInput(props : TextInputProps){
    return(
        <div>
            <TextField name={props.name}></TextField>
            <input type="text" className='inputField'/>
        </div>
    );
}