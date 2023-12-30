import {promises as fs} from "fs"
import {nanoid} from "nanoid"

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
}

readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products);
}
  
exist = async (id) => {
    let products = await this.readProducts();
    return products.find(prod => prod.id === id)
}
writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
}

addProducts = async (product) =>{
        let productsOld = await this.readProducts()
        product.id = nanoid(10)
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "PRODUCTO AGREGADO";
    };

getProducts = async () => {
    return await this.readProducts()
};

getProductsById = async (id) => {
    let productsById = await this.exist(id)
    if(!productsById) return "PRODUCTO NO ENCONTRADO"
    return productsById
};

updateProducts = async (id, product) => {
    let productsById = await this.exist(id)
    if(!productsById) return "PRODUCTO NO ENCONTRADO"
    await this.deleteProducts(id)
    let productsOld = await this.readProducts()
    let products = [{...product, id : id}, ...productsOld]
    await this.writeProducts(products)
    return "PRODUCTO ACTUALIZADO"                           

}
deleteProducts = async (id) => {
    let products = await this.readProducts();
    let existProducts = products.some(prod => prod.id === id)
    if (existProducts) {
        let filterProducts = products.filter(prod => prod.id != id)
        await this.writeProducts(filterProducts)
        return "PRODUCTO ELIMINADO"
    }
        return "NO EXISTE EL PRODUCTO A ELIMINAR"
}
}




export default ProductManager

































