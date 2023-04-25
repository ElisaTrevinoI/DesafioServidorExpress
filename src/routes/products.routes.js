import { Router } from "express";

import { ProductManager } from "../ProductManager.js";

const ProductManager1 = new ProductManager('./archivo.txt')

const productRouter = Router()


productRouter.get('/', async (req, res) => {

    const limite = req.query.limit

    const productos = await ProductManager1.getProducts()

    if (limite > 0) {

        const productsBuscados = productos.splice(0, limite)

        res.send(JSON.stringify(productsBuscados))

    } else {

        res.send(JSON.stringify(productos))
    }
})

productRouter.get("/:pid", async (req, res) => {

    const productoBuscar = await ProductManager1.getProductById(req.params.pid)

    res.send(JSON.stringify(productoBuscar))

})

productRouter.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const productoAlta = req.body
    if ((productoAlta.title > "") && (productoAlta.description > "") && (productoAlta.code > "") && (productoAlta.price > 0) && (productoAlta.stock > 0) && (productoAlta.category > "")) {
        await ProductManager1.addProduct({ title, description, code, price, status, stock, category, thumbnails })
        res.send("Producto creado")
    }
    res.send("Faltan Datos")
})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, code, price, status, stock, category, thumbnails } = req.body

    const mensaje = await ProductManager1.updateProduct(id, { title, description, code, price, status, stock, category, thumbnails })
    res.send(mensaje)
})

productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await ProductManager1.deleteProduct(id)
    res.send(mensaje)
})


export default productRouter