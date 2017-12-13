import { Router } from 'express';
import { sendEmail } from '../services/email.svc';

console.log("inside of send list ctrl");


const router = Router(); 

// actually /api/sendlist
router.post('/', (req, res) => {
    console.log(req.body.from);
    console.log(req.body.message);
    
    sendEmail('jnrrosario@gmail.com', req.body.from, 'New contact form submission', req.body.message)
    .then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

export default router;