import React, { useState, ChangeEvent, useEffect } from "react";
import { useUser } from "../../hooks/useContextUserId";
import axios from "axios";
import "./styles.css";

import SideBar from "../../components/sidebar";
import { GenerateStudyMaterial } from "../../hooks/useOpenAI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StudyMaterialPageProps {
	userName: string;
	password: string;
	data: Date;
	number: number;
}
interface Material {
	name: string;
	type: string;
	author: string;
	description: string;
}

export default function StudyMaterialPage(props: StudyMaterialPageProps) {
	const { userId, token } = useUser();
	const [textInput, setTextInput] = useState('');
	const [underlineGenerate, setUnderlineGenerated] = useState(true);
	const [underlineFavorite, setUnderlineFavorite] = useState(false);
	const [favorite, setFavorite] = useState<Material[]>([]);
	const [materials, setMaterials] = useState<Material[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const handleGptGenerate = async () => {
		try {
			setIsLoading(true);
			var material = { material: textInput }
			if (token) await GenerateStudyMaterial(material, token).then((res) => setMaterials(res.data.response.respects)).catch(() => { throw new Error("Request faild") });
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		};
	};

	useEffect(() => {
		listFavorites(userId!);
	}, []);

	const handleFavorite = () => {
		setUnderlineFavorite(!underlineFavorite);
		setUnderlineGenerated(!underlineGenerate);
	};

	const handleGenerate = () => {
		setUnderlineGenerated(!underlineGenerate);
		setUnderlineFavorite(!underlineFavorite);
	};

	const listFavorites = async (userId: number) => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`http://localhost:8000/openai/favorite/list/${userId}`,
				config
			);

			setFavorite(response.data);
			console.log(favorite);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		};
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTextInput(event.target.value);
	}

	const createFavorite = async ({ name, type, author, description }: Material) => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`http://localhost:8000/openai/favorite/create`,
				{
					favorite: {
						name: name,
						type: type,
						author: author,
						description: description,
						userId: userId
					},
				},
				config
			);
			setFavorite(materials);
			setMaterials((pList) => pList.filter(x => x.name !== name));
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		};
	};


	return (
		<main className="main-container">
			<SideBar />
			<div className="searchContainer">
				<div className="search-container-top">
					<p className="title">Study Material</p>
					<div className="op">
						<input className="generate-input" onChange={handleInputChange} />
						<button className="generate-button" onClick={handleGptGenerate}>Generate</button>
					</div>
				</div>
				<div>
					<button className={underlineGenerate ? "side-btn underline" : "side-btn"} onClick={handleGenerate} >Generate</button>
					<button className={underlineFavorite ? "side-btn underline" : "side-btn"} onClick={handleFavorite} >Favorite</button>
				</div>
				{isLoading ?
					<div className="loading-spinner">
						<div className="spinner"></div>
					</div>
					: null
				}
				{materials.map((material, index) => (
					<div key={index} className="card-main">
						<div className="card-inside">
							<div>
								<div>
									<b>
										{material.name}
									</b>
								</div>
								<div>
									{material.type}
								</div>
							</div>
							<div>
								<FontAwesomeIcon icon={faStar} />
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	)
}