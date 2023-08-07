import React from "react";
import "./styles.css";

interface ContainerProps {
    comp: React.ReactNode
}

export default function Container(props : ContainerProps){
  return(
    <div className='container-centered'>
      {props.comp}
    </div>
  );
}