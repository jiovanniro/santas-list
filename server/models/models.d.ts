//tell TypeScript about our data models
//descriptions of the structure of our data

declare namespace models {
    interface IUser {
        id: number; 
        user: string;
        email: string;
        password?: any;
    }
    interface ICourse {
        id: number; 
        name: string;
    }
}