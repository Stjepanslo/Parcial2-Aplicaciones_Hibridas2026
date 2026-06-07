import * as clientsService from "../services/clients.services.js"
import * as clientsView from "../views/clients.views.js"

export async function getClientes(req, res) {
    try {
        const clientes = await clientsService.getClientes()
        res.send(clientsView.createClientesList(clientes))
    } catch (error) {
        res.send(clientsView.create404Page())
    }
}

export async function getClienteById(req, res) {
    const id = req.params.id
    
    try {
        const cliente = await clientsService.getClienteById(id)
        if (!cliente) {
            return res.send(clientsView.create404Page())
        }
        res.send(clientsView.createClientePage(cliente))
    } catch (error) {
        res.send(clientsView.create404Page())
    }
}

export async function getProyectosByClienteId(req, res) {
    const clienteId = req.params.id
    
    try {
        const cliente = await clientsService.getClienteById(clienteId)
        if (!cliente) {
            return res.send(clientsView.create404Page())
        }
        
        const proyectos = await clientsService.getProyectosByClienteId(clienteId)
        res.send(clientsView.createProyectosClienteList(cliente, proyectos))
    } catch (error) {
        res.send(clientsView.create404Page())
    }
}