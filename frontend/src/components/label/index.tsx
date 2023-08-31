import React from "react";
import "./styles.css";

interface TextWithInputFieldProps {
    textName: string;
}

export default function Label(props : TextWithInputFieldProps){
  return(
    <div>
      <p className="p">{props.textName}</p>
    </div>
  );
}