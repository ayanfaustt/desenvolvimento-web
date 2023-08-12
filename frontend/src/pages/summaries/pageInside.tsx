import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";

export default function SummariesInsidePage() {

	return (
		<main className="resume">
			<SideBar />
			<div className="resume-content">
				<h1>Resumo</h1>
				<p>texto resumo</p>
			</div>
		</main>
	);
}