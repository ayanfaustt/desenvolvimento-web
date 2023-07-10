import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

interface CardsProps {
    name: string;
    tag: string;
}

export default function Cards(props: CardsProps) {
    return (
        <div className='mainCard'>
            <div className='name-tag'>
                <p className='p'>{props.name}</p>
                <p className='p'>{props.tag}</p>
            </div>

            <div className='icons'>
                <FontAwesomeIcon icon={faTrash} />
                <FontAwesomeIcon icon={faPen} />
            </div>
        </div>
    )
}