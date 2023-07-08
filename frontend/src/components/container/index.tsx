import React, { Component } from 'react';
import './styles.css';

interface ContainerProps {
    comp: React.ReactNode
}

export default function Container(props : ContainerProps){
    return(
        <div className='content-centered'>
            {props.comp}
        </div>
    );
}