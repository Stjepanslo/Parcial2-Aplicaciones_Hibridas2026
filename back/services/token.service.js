import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export function createToken(usuario) {
    const token = jwt.sign(
        { ...usuario, password: undefined, _id: undefined },
        process.env.SECRET_PASSWORD,
        { expiresIn: "2h" }
    )
    return token
}

export function validateToken(token) {
    try {
        const payload = jwt.verify(token, process.env.SECRET_PASSWORD)
        return payload
    } catch (error) {
        throw new Error("Token inválido")
    }
}