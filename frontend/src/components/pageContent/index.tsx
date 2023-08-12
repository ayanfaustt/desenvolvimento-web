import React, { useState } from "react";
import "./styles.css";
import SideBar from "../../components/sidebar";
import Cards from "../card";
import PageNameAndButtons from "../pageNameAndButtons";
import { Alert, Button, Col, Modal, Row } from "react-bootstrap";
import { DeleteSummarie } from "../../hooks/useSummarie";
import { Link, useLocation } from "react-router-dom";

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
	onItemUpdated: () => void;
};

export default function PageContent(props: PageContentProps) {
	const [showAlert, setShowAlert] = useState(false);
	const [deleteVisible, setDeleteVisible] = useState(false);
	const [summarieId, setSummarieId] = useState<number>(0);
	const location = useLocation();

	const handleVisible = (id: number) => {
		setDeleteVisible(true);
		setSummarieId(id);
	};

	const handleDelete = async () => {
		await DeleteSummarie(summarieId).then(() => props.onItemUpdated());
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
			setDeleteVisible(false);
		}, 2000);
	};

	const handleCardClick = () => {
		console.log('aq')
	}

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
				<PageNameAndButtons name={props.pageName} onItemUpdated={props.onItemUpdated} />
				<div className='cards'>
					{props.cardsContent.map((content) => (
						<Link to={`${location.pathname}/resume`} onClick={handleCardClick}>
							<Cards name={content.summarie_name} tag={content.tag.tag_name} summarieId={content.id} handleDelete={handleVisible} />
						</Link>
					)
					)}
				</div>
			</div>
		</main>
	);
}