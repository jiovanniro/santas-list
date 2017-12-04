import * as express from 'express'; 
//import controllers 
import cart from './controllers/cart.ctrl';
import checkout from './controllers/checkout.ctrl';
import contact from './controllers/contact.ctrl';
import products from './controllers/products.ctrl';
import single from './controllers/single.ctrl';

const router = express.Router();

router.use('/cart', cart);
router.use('/checkout', checkout);
router.use('/contact', contact);
router.use('/products', products);
router.use('/single', single);



export default router;