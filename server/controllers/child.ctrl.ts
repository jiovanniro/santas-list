import * as express from 'express'; 
import * as procedures from '../procedures/child.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import * as utils from '../utils';

const router = express.Router();

//might need to change location if it does not work
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
//might need to change location if it does not work
router.get('/createChild/:id', function(req, res){
    procedures.getItems(req.params.id)
    .then(function(item){
        res.send(item);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

router.post('/:id', function(req, res){
    procedures.addItem(req.body, req.params.id)
    .then(function(item){
        res.send(item);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

router.get('/:id', function(req, res){
    procedures.getComments(req.params.id)
    .then(function(item){
        res.send(item);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

export default router;