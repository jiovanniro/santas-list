import * as express from 'express'; 
import * as procedures from '../procedures/cart.proc';

let router = express.Router();

//router.get('*', auth.isLoggedIn);

// -- /api/cart
router.route('/')
    .get(function(req, res) {
        procedures.all()
        .then(function(item) {
            res.send(item);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    })
    .post(function(req, res){
        procedures.post(req.body.productId, req.body.purchaseId)
        .then(function(item){
            res.send(item);
        }).catch(function(err){
            res.status(500).send(err);
        });
    })

router.route('/:id')
    .get(function(req, res){
        procedures.listedItems(req.params.id)
        .then(function(items){
            res.send(items);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    })

export default router;

//Does not handle authentication right now