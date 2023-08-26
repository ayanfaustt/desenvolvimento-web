import React, { useState } from "react";
import "./styles.css";
import SideBar from "../sidebar";
import Cards from "../card";
import PageNameAndButtons from "../pageNameAndButtons";
import { Alert, Button, Col, Modal, Row } from "react-bootstrap";
import { DeleteDeck } from "../../hooks/useFlashcard";
import { DeleteSummarie } from "../../hooks/useSummarie";

interface CardInfo {
	id: number;
	summarie_name: string;
	tag: {
		tag_name: string;
	};
};

interface PageContentProps {
	pageName: string;
	cardsContent: CardInfo[];
	onItemChanged: () => void;
	onFilter: (tagId: number | null) => void;
};

export default function PageSummariesContent(props: PageContentProps) {
	const [showAlert, setShowAlert] = useState(false);
	const [deleteVisible, setDeleteVisible] = useState(false);
	const [deckId, setDeckId] = useState<number>(0);

	const handleVisible = (id: number) => {
		setDeleteVisible(true);
		setDeckId(id);
	};

	const handleDelete = async () => {
		await DeleteSummarie(deckId).then(() => props.onItemChanged());
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
			setDeleteVisible(false);
		}, 2000);
	};

	return (
		<main className='sidebar-content'>
			<Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
				<Modal.Header style={{ backgroundColor: "#DAE9F1", height: "50px" }} closeButton />
				<Modal.Body style={{ backgroundColor: "#DAE9F1", paddingTop: "10px", paddingBottom: "30px", paddingRight: "150px", paddingLeft: "150px" }}>
					<Row>
						<Col>
							Are you sure to delete this resume?
						</Col>
					</Row>
					<Row>
						<Col>
							<Button onClick={() => setDeleteVisible(false)}>
								Cancel
							</Button>
						</Col>
						<Col>
							<Button onClick={handleDelete}>
								Confirm
							</Button>
						</Col>
						{showAlert && (
							<Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
								Deleted successfully!
							</Alert>
						)}
					</Row>
				</Modal.Body>
			</Modal>

			<SideBar />
			<div className='pageContent'>
				<PageNameAndButtons name={props.pageName} onItemUpdated={props.onItemChanged} onFilter={props.onFilter} deck={false} summarie={true} />
				<div className='cards'>
					{props.cardsContent.map((content) => (
						<Cards name={content.summarie_name} tag={content.tag.tag_name} itemId={content.id} handleDelete={handleVisible} isFlashCard={false}/>
					)
					)}
				</div>
			</div>
		</main>
	);
}