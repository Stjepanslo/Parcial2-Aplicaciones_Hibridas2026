import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://eaoven89_db_user:CYMdfQ6I75osibm5@clusteraplicacioneshibr.chxaswv.mongodb.net/eaoven89_db_user")
const db = client.db("AH20232CP1")

export async function getClientes(filter = {}) {
    try {
        await client.connect()
        const filterMongo = { eliminado: { $ne: true } }
        
        const clientes = await db.collection("Clientes").find(filterMongo).toArray()
        await client.close()
        return clientes
    } catch (error) {
        console.log("Error:", error)
        return []
    }
}

export async function getClienteById(id) {
    try {
        await client.connect()
        const cliente = await db.collection("Clientes").findOne({ _id: new ObjectId(id) })
        await client.close()
        return cliente
    } catch (error) {
        console.log("Error:", error)
        return null
    }
}

export async function createCliente(cliente) {
    try {
        await client.connect()
        const resultado = await db.collection("Clientes").insertOne(cliente)
        await client.close()
        return { _id: resultado.insertedId, ...cliente }
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

export async function getProyectosByClienteId(clienteId) {
    try {
        await client.connect()
        const proyectos = await db.collection("Projects").find({ clientId: new ObjectId(clienteId) }).toArray()
        await client.close()
        return proyectos
    } catch (error) {
        console.log("Error:", error)
        return []
    }
}

export async function updateCliente(id, cliente) {
    try {
        await client.connect()
        await db.collection("Clientes").updateOne(
            { _id: new ObjectId(id) },
            { $set: cliente }
        )
        await client.close()
        return { _id: id, ...cliente }
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

export async function deleteProyecto(id) {
    try {
        await client.connect()
        const resultado = await db.collection("Clientes").updateOne(
            { _id: new ObjectId(id) },
            { $set: { eliminado: true } }
        )
        await client.close()
        return resultado
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}