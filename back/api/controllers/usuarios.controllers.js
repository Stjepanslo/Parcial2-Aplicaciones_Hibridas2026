import * as usuariosService from "../../services/usuarios.service.js"

export function createUser(req, res) {
        usuariosService.createUser(req.body)

            .then(usuario => res.status(201).json(usuario))

            .catch(err => res.status(400).json({ message: err.message }))

            
}

export function login(req, res) {
    usuariosService.login(req.body)

        .then(usuario => res.status(200).json(usuario))

        .catch(err => res.status(400).json({ message: err.message }))
}