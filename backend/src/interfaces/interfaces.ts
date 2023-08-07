import { Model } from "sequelize";

export interface IGetUser {
    username: string;
    email: string;
    password: string;
}

export interface IMetricsParams{
    userId: string;
}

export interface IMetricsVBody{
    userId: string;
    reviews: number;
    lastLogin: Date;
}


export interface IUserWithMetrics {
	user: Model
	metricsInfo: MetricComparationModel
}

export interface IStudyMaterial{
	contentTitle: string;
	contentMediaType: string;
	contentDescription: string;
	whereToFind: string;
}

export interface Icard{
	title: string;
	content: string;
}

export interface MetricComparationModel {
isGrowth: boolean;
percent: number;
}