import {Request, Response, NextFunction} from 'express';

export function isLoggedIn (req: Request, res: Response, next: NextFunction) {
    //if the user exist
    if (req.user) { 
        next();
    } else {
        res.sendStatus(401); 
    }
}

export function isAdmin (req: Request, res: Response, next: NextFunction) {
    //if the user exist
    if (req.user.role === "admin") { 
        next();
    } else {
        res.sendStatus(401); 
    }
}

export function canUpdateUser(req: Request, res: Response, next: NextFunction) {
    console.log("in auth.mw.ts canUpdateUser");
    console.log(req.body);
    let role = req.user.role;
    if (role === 'manager' || role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
}
