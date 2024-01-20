import { Router } from 'express';
import { __dirname } from '../path.js';

import { routerProduct } from './products.routes.js';
import { routerCarts } from './carts.routes.js';
import { routerChat } from './chat.routes.js';


const router = Router()


//Routes
router.use('/api/products', routerProduct);
router.use('/api/carts', routerCarts);
router.use('/api/chat', routerChat);

export default router;