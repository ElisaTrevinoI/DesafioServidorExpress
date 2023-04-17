import { promises as fs } from 'fs'



export class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(producto) {

        const contenido1 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta3 = JSON.parse(contenido1)
        auxConsulta3.push(producto)
        await fs.writeFile(this.path, JSON.stringify(auxConsulta3))
        return "Producto creado"


    }

    async getProducts() {

        let contenidoLeer = await fs.readFile(this.path, 'utf-8')
        const auxLeer = JSON.parse(contenidoLeer)

        return auxLeer

    }

    async getProductById(idBuscar) {

        let contenido3 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta4 = JSON.parse(contenido3)
        const product = auxConsulta4.find(productoCons => productoCons.id == idBuscar)

        if (product) {
            return product
        }
        return "Producto no encontrado"
    }

    async updateProduct(idActualizar, obActualizar) {

        let contenido4 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta5 = JSON.parse(contenido4)
        const objBuscar = auxConsulta5.findIndex((obj => obj.id == idActualizar))

        let llaves = Object.keys(obActualizar)
        let valores = Object.values(obActualizar)

        let llave = ""


        llaves.forEach((element, index) => {
            llave = element
            let objMod = auxConsulta5[objBuscar]
            if (llave != 'id') {
                objMod[llave] = valores[index]
            }
        })

        await fs.writeFile(this.path, JSON.stringify(auxConsulta5))
        return "Producto actualizado"

    }

    async deleteProduct(idBorrar) {


        let contenido5 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta6 = JSON.parse(contenido5)
        const objBuscar = auxConsulta6.findIndex((obj => obj.id == idBorrar))


        if (objBuscar > -1) {
            auxConsulta6.splice(objBuscar, 1)
            await fs.writeFile(this.path, JSON.stringify(auxConsulta6))
            return "Producto borrado"
        }

    }

}


export class Product {
    constructor(title = "", description = "", price = 0, thumbnail = "", code = "", stock = 0) {
        this.id = Product.incrementID()
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }


    static incrementID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

//const newProduct1 = new Product("Laptop", "Computadora portatil", 20000, "RutaImg1", "C-P01", 25)
//const newProduct2 = new Product("Televisión", "Televisión 20 p", 25000, "RutaImg2", "C-P03", 50)
//const newProduct3 = new Product("Computadora", "Computadora de escritorio", 15000, "RutaImg3", "C-P03", 30)
//const newProduct4 = new Product("Celular", "Teléfono celular", 10000, "RutaImg4", "C-P02", 65)
//const newProduct5 = new Product()

//const productManager = new ProductManager('./archivo.txt')

//El archivo tiene inicialmente un arreglo vacío


//Agrega productos al archivo


/*console.log(await productManager.addProduct(newProduct1))

console.log(await productManager.addProduct(newProduct2))

console.log(await productManager.addProduct(newProduct3))

console.log(await productManager.addProduct(newProduct4))*/





//Lee el archivo y muestra los productos

//console.log(await productManager.getProducts())




//Muestra el producto del que pasamos el ID a consultar

//console.log(await productManager.getProductById(1))




//Actualiza producto del que pasamos el ID con la información del objeto que pasamos como parámetro

/*let obModif = {title: "Tablet", description: 'Tableta portatil', price: 12000, thumbnail: "RutaImg1_1", code: 'C-H01', stock: 20 }

console.log(await productManager.updateProduct(1, obModif))*/




//Borra el producto que tiene el ID que pasamos

//console.log(await productManager.deleteProduct(2))

