import { createClienteSchema, updateClienteSchema } from "../schemas/clientes.js"

export function validateCreateCliente(req, res, next) {
    createClienteSchema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({ message: err.errors }))
}

export function validateUpdateCliente(req, res, next) {
    updateClienteSchema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({ message: err.errors }))
}