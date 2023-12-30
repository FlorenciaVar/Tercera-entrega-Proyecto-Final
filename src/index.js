import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from 'socket.io';


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

const product = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ESTRUCTURA HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//STATIC
app.use("/", express.static(__dirname + "/public"))

//VISTA "HOME.HANDLEBARS"
app.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home",{
        title: "Lista de productos",
        products: allProducts
    })
})

//VISTA "realTimeproducts"
app.get("/realTimeproducts", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("realTimeproducts",{
        title: "Lista de productos",
        products: allProducts
    })
})




app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)



