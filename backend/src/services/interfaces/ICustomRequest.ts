import Favorite from "./IFavorite";
import { Request } from "express";

interface CustomRequest extends Request{
	body: {
		cardTitle?: string;
		summarieTitle?: string;
		material?: string;
		favorite?: Favorite;
	};
}

export default CustomRequest;