import { Router } from "express";
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";

export const routerProduct = Router();

//("api/products")
routerProduct.get('/', getProducts);
routerProduct.get('/:pid', getProduct);
routerProduct.post('/', postProduct);
routerProduct.put('/:pid', updateProduct);
routerProduct.delete('/:pid', deleteProduct);