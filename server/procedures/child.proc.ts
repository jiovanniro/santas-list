import {row, rows, empty} from '../config/db';

export function create(user: string, password: string, adultId: number): Promise<models.IUser> {
    return row('create_child_user', [user, password, adultId]);
}