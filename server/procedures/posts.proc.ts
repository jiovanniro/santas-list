import {row, rows, empty} from '../config/db';  

//need to add a model for types 
//id will be category. Apparel (1) Misc (2)
export function all (id: number){
    return rows('get_products',[id]); 
}

//product id
export function single(id: number) {
    return row('get_one_product', [id]);
}

export function add(productId:number, purchaseId: number) {
    return rows('push_purchasesproduct', [productId, purchaseId]);
}

