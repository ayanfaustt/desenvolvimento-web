import React from "react";
import "./styles.css";

interface TextFieldProps {
    name: string;
}

export default function TextField(props : TextFieldProps){
  return(
    <p className='p textName'>{props.name}</p>
  );
}