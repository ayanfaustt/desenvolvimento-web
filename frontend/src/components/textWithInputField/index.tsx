import React from 'react';
import './styles.css';

interface TextWithInputFieldProps {
    textName: string;
    inputType: string;
    inputPlaceHolder: string;
}

export default function TextWithInputField(props : TextWithInputFieldProps){
    return(
        <div>
            <p className="p">{props.textName}</p>
            <input type={props.inputType} name={props.inputType} placeholder={props.inputPlaceHolder} />
        </div>
    )
}