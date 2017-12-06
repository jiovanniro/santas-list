import * as express from 'express'; 
import * as procedures from '../procedures/adult.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import * as utils from '../utils';

const router = express.Router();

router.post('/:id', function(req, res){
    procedures.addComment(req.body.message, req.body.commentName, req.body.itemId)
    .then(function(item){
        res.send(item);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

router.get('/:id', function(req, res){
    procedures.getFamList(req.params.id)
    .then(function(item){
        res.send(item);
    }).catch(function(err){
        res.status(500).send(err);
    });
})