import React, { ChangeEvent } from 'react';
import './styles.css';
import TextField from '../textField';

interface TextInputProps {
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function TextInput(props: TextInputProps) {

    return (
        <div>
            <TextField name={props.name}></TextField>
            <input name={props.name} type="text" className='inputField' onChange={props.onChange} />
        </div>
    );
}