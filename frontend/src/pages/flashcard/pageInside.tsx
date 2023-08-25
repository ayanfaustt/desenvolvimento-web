import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListSummarie } from "../../hooks/useSummarie";
import { ListCards } from "../../hooks/useFlashcard";

export default function CardsInsidePage() {
	const location = useLocation();
	const { itemId } = location.state;
	const [cardContent, setCardContent] = useState({ cardName: "", cardContent: "" });

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				await ListCards(itemId).then((res) => {
					console.log(res)
					// setCardContent({ summarieName: res.data.summarie_name, summarieContent: res.data.summarie_content })
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
				{/* <h1>{cardContent.summarieName}</h1> */}
				{/* <p>{cardContent.summarieContent}</p> */}
			</div>
		</main>
	);
}