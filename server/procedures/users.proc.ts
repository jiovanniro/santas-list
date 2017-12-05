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

export function create(username: string, email: string, password: string) {
    return rows('CreateUser', [username, email, password]);
}

export function destroy(id: number) {
    return empty('DeleteUser', [id]);
}