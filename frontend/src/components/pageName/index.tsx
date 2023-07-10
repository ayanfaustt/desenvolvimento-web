import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFilter } from '@fortawesome/free-solid-svg-icons';

interface PageNameProps {
    name: string;
}

export default function PageName(props: PageNameProps) {
    return (
        <div className='deckName'>
            <h1>{props.name}</h1>
            <div className="icons2">
                <FontAwesomeIcon icon={faCirclePlus} />
                <FontAwesomeIcon icon={faFilter} />
            </div>
        </div>
    )
}