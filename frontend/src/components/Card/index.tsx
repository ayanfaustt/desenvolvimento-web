import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

interface CardsProps {
	handleDelete: (id: number) => void;
	itemId: number;
	name: string;
	tag: string;
}

export default function Cards(props: CardsProps) {
	const location = useLocation();
	const navigation = useNavigate();

	const handleClickDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		props.handleDelete(props.itemId);
	};


	const handleCardClick = () => {
		navigation(`${location.pathname}/resume`, {
			state: {
			  itemId: props.itemId,
			  name: props.name,
			},
		  });
	}

	return (
		<div className='mainCard'>
			<div className="borderDiv">
					<button className="insideCard" onClick={handleCardClick}>
						<div className='name-tag'>
							<p className='p'>{props.name}</p>
							<div className='tag'><div className='blackbox' /><p className='p'>{props.tag}</p></div>
						</div>
					</button>
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