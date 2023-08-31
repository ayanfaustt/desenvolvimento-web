import React, { useState, ChangeEvent, useEffect } from "react";
import { useUser } from "../../hooks/useContextUserId";
import axios from "axios";
import "./styles.css";

import SideBar from "../../components/sidebar";

interface StudyMaterialPageProps {
    userName: string;
    password: string;
    data: Date;
    number: number;
}
interface Material{
	name: string;
	type: string;
	author: string;
	description: string;
}

export default function StudyMaterialPage(props : StudyMaterialPageProps){
	const { userId, token } = useUser();
	const [textInput, setTextInput] = useState('');
    const [underlineGenerate, setUnderlineGenerated] = useState(true);
    const [underlineFavorite, setUnderlineFavorite] = useState(false);
    const [favorite, setFavorite] = useState<Material[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const handleGptGenerate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `http://localhost:8000/openai/create/materials`,
                {
                    material: textInput
                },
                config
            );

            if(!response)
                throw new Error("Request faild");
            
            setMaterials(response.data.response.respects);
            console.log(materials);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
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

    const listFavorites = async (userId: number) =>{
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
        }
    };

    const createFavorite = async ({name, type, author, description}: Material) => {
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
        }   
    
    };


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
					<button className="side-btn">Generate</button>
					<button className="side-btn">Favorite</button>
				</div>
			</div>
		</main>
    )
}