export interface IGetUser {
    username: string
}

export interface IMetricsParams{
    userId: string
}

export interface IMetricsVBody{
    userId: string;
    reviews: number;
    lastLogin: Date;
}