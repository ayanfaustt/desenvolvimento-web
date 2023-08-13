import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { DeleteSummarie } from "../../hooks/useSummarie";
import { Link, useLocation } from "react-router-dom";

interface CardsProps {
	handleDelete: (id: number) => void;
	itemId: number;
	name: string;
	tag: string;
}

export default function Cards(props: CardsProps) {
	const location = useLocation();

	const handleClickDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		props.handleDelete(props.itemId);
	};


	const handleCardClick = () => {
		console.log('aq')
	}

	return (
		<div className='mainCard'>
			<div className="borderDiv">
				<Link to={`${location.pathname}/resume`} onClick={handleCardClick}>
					<div className="insideCard">
						<div className='name-tag'>
							<p className='p'>{props.name}</p>
							<div className='tag'><div className='blackbox' /><p className='p'>{props.tag}</p></div>
						</div>
					</div>
				</Link>
				<div className='icons'>
					<button className="btn-card" onClick={handleClickDelete}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
					<button className="btn-card" onClick={handleClickDelete}>
						<FontAwesomeIcon icon={faPen} />
					</button>
				</div>
			</div>
		</div>
	);
}