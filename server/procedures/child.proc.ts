import {row, rows, empty} from '../config/db';

export function create(adultId: number, user: string, password: string): Promise<models.IUser> {
    return row('create_child_user', [adultId, user, password]);
}

export function addItem(item: string, id: number){
    return row('post_item', [item, id]);
}

export function getComments(id: number){
    return rows('get_comments', [id]);
}

export function getItems(id: number){
    return rows('get_item', [id]);
}