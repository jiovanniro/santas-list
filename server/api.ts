import * as express from 'express'; 
//import controllers 
import posts from './controllers/posts.ctrl';
import single from './controllers/single.ctrl';

const router = express.Router();

router.use('/products', posts);
router.use('/single', single);

export default router;