import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListSummarie } from "../../hooks/useSummarie";

export default function SummariesInsidePage() {
	const location = useLocation();
	const { itemId, name } = location.state;
	const [resumeContent, setResumeContent] = useState();

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				await ListSummarie(itemId).then(res => setResumeContent(res.data.summarie_content))
			} catch (err) {
				console.log(err)
			}
		};
		fetchResumeContent();
	}, []);


	return (
		<main className="resume">
			<SideBar />
			<div className="resume-content">
				<h1>{name}</h1>
				<p>{resumeContent}</p>
			</div>
		</main>
	);
}