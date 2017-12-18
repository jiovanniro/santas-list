import * as bcrypt from 'bcrypt'; 

const SALT_ROUNDS = 12;

export function encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export function checkPassword(password: string, hash: string): 
Promise<boolean> {
    return bcrypt.compare(password, hash);
}