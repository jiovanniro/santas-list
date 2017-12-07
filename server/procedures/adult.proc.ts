import {row, rows, empty} from '../config/db';

export function addComment(message: string, name: string, id: number){
    return row('post_item', [message, name, id]);
}

export function getFamList(id: number) {
    return row('get_family_list', [id]);
}