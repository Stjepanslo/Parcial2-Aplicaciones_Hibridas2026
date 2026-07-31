import { createProyectoSchema, updateProyectoSchema } from "../schemas/proyectos.js"

export function validateCreateProyecto(req, res, next) {
    console.log("Validando:", req.body)
    console.log("Archivo:", req.file)
    createProyectoSchema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({ message: err.errors }))
}

export function validateUpdateProyecto(req, res, next) {
    updateProyectoSchema.validate(req.body)
        .then(() => next())
        .catch((err) => {
            console.log("Error de validación:", err.errors)
            res.status(400).json({ message: err.errors })
            })
}