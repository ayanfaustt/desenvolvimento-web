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
