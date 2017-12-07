import * as express from 'express'; 
import * as procedures from '../procedures/child.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import * as utils from '../utils';

const router = express.Router();

//might need to change location if it does not work
router.post('/login', (req, res, next) => {
    console.log("inside of child ctrl login");
    console.log(req.body);

    //authenticating the request
    passport.authenticate('local-child', (err: any, user: models.IUser, info: any) => {
        if (err) {
            console.log(err); 
            return res.sendStatus(500);
        } 
        if (!user) {
            return res.status(401).send(info);//info is message sent from passport.ts
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.send(user);//send user to passport to be serialized or deserialized
            }
        });
    })(req, res, next);
});


router.post('/createChild', function(req, res){
    utils.encryptPassword(req.body.password)
    .then((hash) => {
        return procedures.create(req.body.adultId, req.body.username, hash);
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