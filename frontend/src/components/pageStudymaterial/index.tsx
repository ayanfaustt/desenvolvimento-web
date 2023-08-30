import React from "react";
import './styles.css';
import SideBar from "../sidebar";





export default function PageStudyMaterial(){
	return(
		<main className="main-container">
			<SideBar/>
			<div className="searchContainer">
				<div className="search-container-top">
					<p className="title">Study Material</p>
					<div className="op">
						<input className="generate-input "/>
						<button className="generate-button ">Generate</button>
					</div>
				</div>
				<div>
					<button className="btn">Generate</button>
					<button className="btn">Favorite</button>
				</div>
			</div>
		</main>
	)
}