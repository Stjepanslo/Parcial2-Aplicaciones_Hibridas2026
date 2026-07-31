import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://eaoven89_db_user:CYMdfQ6I75osibm5@clusteraplicacioneshibr.chxaswv.mongodb.net/eaoven89_db_user")
const db = client.db("AH20232CP1")

export async function getProyectos(filter = {}) {
    try {
        await client.connect()
        const filterMongo = { eliminado: { $ne: true } }
        
        if (filter?.section) {
            filterMongo.section = filter.section
        }
        
        if (filter?.technology) {
            filterMongo.technologies = { $regex: filter.technology, $options: "i" }
        }
        
        const proyectos = await db.collection("Projects").find(filterMongo).toArray()

        return proyectos
    } catch (error) {
        console.log("Error:", error)
        return []
    }
}

export async function getProyectoById(id) {
    try {
        await client.connect()
        const proyecto = await db.collection("Projects").findOne({ _id: new ObjectId(id) })
        return proyecto
    } catch (error) {
        console.log("Error:", error)
        return null
    }
}

export async function createProyecto(proyecto) {
    try {
        await client.connect()

        if (typeof proyecto.technologies === 'string') {
            proyecto.technologies = proyecto.technologies.split(',').map(t => t.trim()).filter(t => t !== '')
        }

        await db.collection("Projects").insertOne(proyecto)
        return { ...proyecto }
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

export async function replaceProyecto(id, proyecto) {
    try {
        await client.connect()
        await db.collection("Projects").replaceOne(
            { _id: new ObjectId(id) },
            proyecto
        )

        return { _id: id, ...proyecto }
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

export async function updateProyecto(id, proyecto) {
    try {
        await client.connect()
        await db.collection("Projects").updateOne(
            { _id: new ObjectId(id) },
            { $set: proyecto }
        )

        return { _id: id, ...proyecto }
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

export async function deleteProyecto(id) {
    try {
        await client.connect()
        const resultado = await db.collection("Projects").updateOne(
            { _id: new ObjectId(id) },
            { $set: { eliminado: true } }
        )

        return resultado
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}