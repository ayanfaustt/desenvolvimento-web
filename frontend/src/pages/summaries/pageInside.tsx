import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListSummarie } from "../../hooks/useSummarie";

export default function SummariesInsidePage() {
	const location = useLocation();
	const { itemId } = location.state;
	const [resumeContent, setResumeContent] = useState({ summarieName: "", summarieContent: "" });

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				await ListSummarie(itemId).then((res) => {
					setResumeContent({ summarieName: res.data.summarie_name, summarieContent: res.data.summarie_content })
				})
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
				<h1>{resumeContent.summarieName}</h1>
				<p>{resumeContent.summarieContent}</p>
			</div>
		</main>
	);
}