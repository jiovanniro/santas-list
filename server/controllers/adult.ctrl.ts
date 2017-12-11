import * as express from 'express'; 
import * as procedures from '../procedures/adult.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import * as utils from '../utils';

const router = express.Router();

router.post('/', function(req, res){
    procedures.addComment(req.body.message, req.body.itemId, req.body.user)
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

router.post('/:id', function(req, res){
    procedures.checked(req.params.id, req.body.purchased)
    .then(function(item){
        res.send(item);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

router.delete('/:id', function(req, res){
    procedures.destroy(req.params.id)
    .then(function(item){
        res.send(item);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

export default router;