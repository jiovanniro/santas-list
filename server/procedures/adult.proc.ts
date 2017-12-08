import {row, rows, empty} from '../config/db';

export function addComment(message: string, id: number, name: string){
    return row('post_comment', [message, id, name]);
}

export function getFamList(id: number) {
    return rows('get_family_list', [id]);
}