//tell TypeScript about our data models
//descriptions of the structure of our data

declare namespace models {
    interface IUser {
        id: number; 
        email: string;
        password?: any;
    }
    interface ICourse {
        id: number; 
        name: string;
    }
}