//tell TypeScript about our data models
//descriptions of the structure of our data

declare namespace models {
    interface IUser {
        id: number; 
        user: any;
        email: string;
        password?: any;
        fam_role: number;
    }
    interface ICourse {
        id: number; 
        name: string;
    }
}