import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { DeleteSummarie } from "../../hooks/useSummarie";

interface CardsProps {
	handleDelete: (id: number) => void;
	summarieId: number;
	name: string;
	tag: string;
}

export default function Cards(props: CardsProps) {
	const handleClickDelete = async (event: React.MouseEvent) => {
		event.stopPropagation();
		props.handleDelete(props.summarieId);
	};

	return (
		<div className='mainCard'>
			<div className="insideCard">
					<div className='name-tag'>
						<p className='p'>{props.name}</p>
						<div className='tag'><div className='blackbox' /><p className='p'>{props.tag}</p></div>
					</div>
				<div className='icons'>
					<button className="btn-card" onClick={handleClickDelete}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
					<button className="btn-card">
						<FontAwesomeIcon icon={faPen} />
					</button>
				</div>
			</div>
		</div>
	);
}