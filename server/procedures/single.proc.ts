import {row, rows, empty} from '../config/db';  

export function single(id: number) {
    return row('get_one_product', [id]);
}

