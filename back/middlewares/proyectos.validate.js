import { createProyectoSchema, updateProyectoSchema } from "../schemas/proyectos.js"

export function validateCreateProyecto(req, res, next) {
    createProyectoSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err) => {
            const errores = {}
            err.inner.forEach(error => {
                errores[error.path] = error.message
            })
            res.status(400).json({ errors: errores })
        })
}

export function validateUpdateProyecto(req, res, next) {
    updateProyectoSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err) => {
            const errores = {}
            err.inner.forEach(error => {
                errores[error.path] = error.message
            })
            res.status(400).json({ errors: errores })
        })
}