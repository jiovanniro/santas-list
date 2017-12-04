import * as express from 'express'; 
import * as procedures from '../procedures/single.proc';

let router = express.Router();

//router.get('*', auth.isLoggedIn);

// -- /api/single
router.route('/:id')
    .get(function(req, res) {
        procedures.single(req.params.id)
        .then(function(item) {
            res.send(item);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    });

export default router;

//Does not handle authentication right now