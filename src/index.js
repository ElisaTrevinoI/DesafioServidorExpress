import express from 'express'

import { ProductManager } from './ProductManager.js'


const app = express()

const PORT = 4000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const ProductManager1 = new ProductManager('./archivo.txt')


app.get('/products', async (req, res) => {

    const limite = req.query.limit

    const productos = await ProductManager1.getProducts()

    if (limite > 0) {

        const productsBuscados = productos.splice(0, limite)

        res.send(JSON.stringify(productsBuscados))

    } else {

        res.send(JSON.stringify(productos))
    }
})

app.get("/products/:pid", async (req, res) => {

    const productoBuscar = await ProductManager1.getProductById(req.params.pid)

    res.send(JSON.stringify(productoBuscar))

})


app.listen(PORT, () => {

    console.log(`Server on port ${PORT}`)

})

