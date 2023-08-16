import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";

export default function SummariesInsidePage() {

	const location = useLocation();
	const { id, name } = location.state;

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