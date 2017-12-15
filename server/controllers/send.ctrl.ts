import { Router } from 'express';
import { sendEmail } from '../services/email.svc';

console.log("inside of send list ctrl");


const router = Router(); 

// actually /api/sendlist
router.post('/:id', (req, res) => {
    console.log('in the send controller');
    // console.log(req.body.child);
    // console.log(req.body.name);
    // console.log(req.body.email);
    // console.log(req.body.behavior);
    // console.log(req.body.message);
    // console.log(req.body.wishlist);
    
    sendEmail('jnrrosario@gmail.com', req.body.child, "Christmas List", req.body.wishlist)
    .then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

export default router;