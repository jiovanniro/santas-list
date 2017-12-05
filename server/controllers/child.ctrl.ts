import * as express from 'express'; 
import * as procedures from '../procedures/child.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import * as utils from '../utils';

const router = express.Router();

router.post('/createChild', function(req, res){
    utils.encryptPassword(req.body.password)
    .then((hash) => {
        return procedures.create(req.body.username, hash, req.body.adultId);
    })
    .then((id: object) => {

        res.status(201).send(id);
    }).catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
    });
})