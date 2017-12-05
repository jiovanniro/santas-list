import {row, rows, empty} from '../config/db';  

export function all(): Promise<Array<models.IUser>> {
    return rows('GetUsers',[]);
}

export function read(id: number): Promise<models.IUser> {
    return row('GetUser', [id]);
}

export function create(firstname: string, lastname: string, email: string, password: string, role: string) {
    return rows('CreateUser', [firstname, lastname, email, password, role]);
}

export function destroy(id: number) {
    return empty('DeleteUser', [id]);
}