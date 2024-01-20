import { Router } from "express";
import { getCart, updateCartProducts, addProductToCart, updateProductQuantity, deleteCartProducts, deleteCartProduct, createTicket } from "../controllers/cart.controllers.js";

export const routerCarts = Router();


//("api/carts")
routerCarts.get('/', getCart);
routerCarts.put('/', updateCartProducts);
routerCarts.post('/product/:pid', addProductToCart);
routerCarts.put('/product/:pid',  updateProductQuantity);
routerCarts.delete('/', deleteCartProducts);
routerCarts.delete('/product/:pid', deleteCartProduct);
routerCarts.post('/purchase', createTicket);