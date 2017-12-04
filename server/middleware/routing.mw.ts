import * as path from 'path'; 
import {Request, Response, NextFunction} from 'express';


let clientPath = path.join(__dirname, '../../client');

export function stateRouting(req: Request, res: Response, next: NextFunction) {
    if (isAsset(req.url)) {
        return next(); //call the next route handler
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
}

function isAsset(path:string){
    let pieces = path.split('/'); 
    if (pieces.length === 0) {return false;}

    let last = pieces[pieces.length -1]; 
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1){
        return true; 
    } else if (last.indexOf('.') !== -1) {
        return true; 
    } else {
        return false; 
    }
}

// export default stateRouting;