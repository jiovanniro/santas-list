import { Router } from 'express';
import { sendEmail } from '../services/email.svc';

const router = Router(); 

// actually /api/sendlist
router.post('/:id', (req, res) => {
    console.log('in the send controller');

 sendEmail('jiovanni.ro@gmail.com', 'jiovanni.ro@gmail.com', "Christmas List", req.body.message)
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