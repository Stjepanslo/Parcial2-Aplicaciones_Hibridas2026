import { MongoClient, ObjectId } from "mongodb"
import { createToken } from "./token.service.js"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db(process.env.DB_NAME)

export async function createUser(usuario) {
    try {
        await client.connect()

        const existe = await db.collection("Usuarios").findOne({ email: usuario.email })
        if (existe) throw new Error("El usuario ya existe")

        usuario.password = await bcrypt.hash(usuario.password, 11)

        await db.collection("Usuarios").insertOne({ ...usuario, passwordConfirm: undefined })

        await client.close()
        return { ...usuario, password: undefined, passwordConfirm: undefined }
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

export async function login(usuario) {
    try {
        await client.connect()
        const existe = await db.collection("Usuarios").findOne({ email: usuario.email })

        if (!existe) throw new Error("Usuario o contraseña incorrectos")

        const esValido = await bcrypt.compare(usuario.password, existe.password)

        if (!esValido) throw new Error("Usuario o contraseña incorrectos")

        const token = createToken(existe)

        await client.close()
        return { email: existe.email, token: token }
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}