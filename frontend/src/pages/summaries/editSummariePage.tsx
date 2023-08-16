import React, { useEffect, useState, useRef } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListSummarie } from "../../hooks/useSummarie";
import { Form } from "react-bootstrap";

export default function EditSummarie() {
	const location = useLocation();
	const { itemId } = location.state;
	const [resumeContent, setResumeContent] = useState({ summarieName: "", tagId: "", summarieContent: "" });

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				await ListSummarie(itemId).then((res) => {
					setResumeContent({ summarieName: res.data.summarie_name, tagId: res.data.tagId, summarieContent: res.data.summarie_content })
				})
			} catch (err) {
				console.log(err)
			}
		};
		fetchResumeContent();
	}, []);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setResumeContent((prevContent) => ({
			...prevContent,
			summarieName: event.target.value,
		}));
	};

	const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setResumeContent((prevContent) => ({
			...prevContent,
			summarieContent: event.target.value,
		}));
	};

	return (
		<main className="resume">
			<SideBar />
			<div className="resume-content">
				<Form className="formEdit">
					<Form.Control
						type="text"
						value={resumeContent.summarieName}
						onChange={handleNameChange}
					/>

					<Form.Control
						as="textarea"
						type="text"
						value={resumeContent.summarieContent}
						onChange={handleContentChange}
			
					/>
				</Form>
			</div>
		</main>
	);
}