import * as express from 'express'; 
import * as procedures from '../procedures/posts.proc';

let router = express.Router();

//router.get('*', auth.isLoggedIn);

router.route('/')
    .get(function(req, res) {
        procedures.all(req.body.productId)
        .then(function(item) {
            res.send(item);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    })
    .post(function(req, res){
        procedures.add(req.body.productId, req.body.purchaseId)
        .then(function(item){
            res.send(item);
        }).catch(function(err){
            res.status(500).send(err);
        });
    })

router.route('/:id')
    .get(function(req, res){
        procedures.single(req.params.id)
        .then(function(items){
            res.send(items);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    })

export default router;
