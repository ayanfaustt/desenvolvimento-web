import { Model } from "sequelize/types/model";

interface IServices {
	list(): Promise<Model[]>;
	get(): Promise<Model>;
	create(): Promise<void>;
	update(): Promise<void>;
	delete(): Promise<void>;
}

export default IServices;