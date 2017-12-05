import {row, rows, empty} from '../config/db';  

export function all(): Promise<Array<models.IUser>> {
    return rows('GetUsers',[]);
}

export function read(user: string): Promise<models.IUser> {
    return row('get_user_by_username', [user]);
}


//Added for checking if child is logging in
export function readChild(user: string): Promise<models.IUser> {
    return row('get_childUser_by_username', [user]);
}

export function create(firstname: string, lastname: string, email: string, password: string, role: string) {
    return rows('CreateUser', [firstname, lastname, email, password, role]);
}

export function destroy(id: number) {
    return empty('DeleteUser', [id]);
}