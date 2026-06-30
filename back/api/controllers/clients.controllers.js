import * as clientsService from "../../services/clients.services.js"

export async function getClientes(req, res) {
    try {
        const clientes = await clientsService.getClientes()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes" })
    }
}

export async function getClienteById(req, res) {
    const id = req.params.id
    
    try {
        const cliente = await clientsService.getClienteById(id)
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" })
        }
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente" })
    }
}

export async function createCliente(req, res) {
    const { nombre, foto, descripcion } = req.body
    
    if (!nombre) {
        return res.status(400).json({ message: "Campo requerido: nombre" })
    }
    
    try {
        const cliente = await clientsService.createCliente(req.body)
        res.status(201).json(cliente)
    } catch (error) {
        res.status(500).json({ message: "Error al crear el cliente" })
    }
}

export async function getProyectosByClienteId(req, res) {
    const clienteId = req.params.id
    
    try {
        const proyectos = await clientsService.getProyectosByClienteId(clienteId)
        res.status(200).json(proyectos)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proyectos del cliente" })
    }
}

export async function updateCliente(req, res) {
    const id = req.params.id
    
    try {
        const cliente = await clientsService.updateCliente(id, req.body)
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente" })
    }
}

export async function deleteCliente(req, res) {
    const id = req.params.id
    
    try {
        const resultado = await clientsService.deleteProyecto(id)
        res.status(200).json({ message: "Cliente eliminado", resultado })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente" })
    }
}