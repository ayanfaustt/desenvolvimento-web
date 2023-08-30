import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListSummarie } from "../../hooks/useSummarie";
import { useUser } from "../../hooks/useContextUserId";

export default function SummariesInsidePage() {
	const location = useLocation();
	const { token } = useUser();
	const { itemId } = location.state;
	const [resumeContent, setResumeContent] = useState({ summarieName: "", summarieContent: "" });

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				if (token) await ListSummarie(itemId, token).then((res) => {
					setResumeContent({ summarieName: res.data.summarie_name, summarieContent: res.data.summarie_content })
				});
			} catch (err) {
				console.log(err);
			};
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