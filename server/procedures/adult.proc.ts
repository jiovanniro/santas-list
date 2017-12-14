import {row, rows, empty} from '../config/db';

export function addComment(message: string, id: number, name: string){
    return row('post_comment', [message, id, name]);
}

export function getFamList(id: number) {
    return rows('get_family_list', [id]);
}

export function checked(id: number, checked: string){
    return row('update_checked', [id, checked]);
}

export function destroy(id: number){
    return empty('remove_item', [id]);
}

export function getAdultUser(id: number){
    return row('get_user_by_id', [id]);
}