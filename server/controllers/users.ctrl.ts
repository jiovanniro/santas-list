import * as express from 'express'; 
import * as procedures from '../procedures/users.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import * as utils from '../utils';


const router = express.Router();

router.get('*', auth.isLoggedIn);


router.post('/login', (req, res, next) => {
    console.log("inside of user ctrl login");
    console.log(req.body);

    //authenticating the request
    passport.authenticate('local', (err: any, user: models.IUser, info: any) => {
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

// router.all('*', auth.isLoggedIn);

router.get('/logout', (req, res) => {
    //making sure a session exist
    if (req.session) {
        req.session.destroy(() => {
            req.logOut();
            res.sendStatus(204);
        });
    }
});

router.get('/me', function(req, res){
    res.send(req.user);
});