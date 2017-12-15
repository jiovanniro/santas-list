import { Router } from 'express';
import { sendEmail } from '../services/email.svc';

const router = Router(); 

// actually /api/sendlist
router.post('/:id', (req, res) => {
    console.log('in the send controller');
    console.log(req.body.child);
    // console.log(req.body.name);
    // console.log(req.body.email);
    // console.log(req.body.behavior);
    // console.log(req.body.message);
    console.log(req.body.wishlist);
    
    sendEmail('jiovanni.ro@gmail.com', req.body.child, "Christmas List", req.body.wishlist)
    .then((response) => {
        console.log('sent email');
        res.sendStatus(201);
    }).catch((err) => {
        console.log('failed to send email');
        console.log(err);
        res.sendStatus(500);
    })
});

export default router;