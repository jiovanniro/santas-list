import * as express from 'express'; 
//import controllers 
import users from './controllers/users.ctrl';
import child from './controllers/child.ctrl';
import adult from './controllers/adult.ctrl';

const router = express.Router();

router.use('/users', users);
router.use('/child', child);
router.use('/adult', adult);

export default router;