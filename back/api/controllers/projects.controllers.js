import * as projectsService from "../../services/projects.services.js"

export async function getProyectos(req, res) {
    const filter = req.query
    
    try {
        const proyectos = await projectsService.getProyectos(filter)
        res.status(200).json(proyectos)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proyectos" })
    }
}

export async function getProyectoById(req, res) {
    const id = req.params.id
    
    try {
        const proyecto = await projectsService.getProyectoById(id)
        if (!proyecto) {
            return res.status(404).json({ message: "Proyecto no encontrado" })
        }
        res.status(200).json(proyecto)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el proyecto" })
    }
}

export async function createProyecto(req, res) {
    const { name, description, link, img, technologies, section } = req.body
    
    if (!name || !section) {
        return res.status(400).json({ message: "Campos requeridos: name, section" })
    }
    
    try {
        const proyecto = await projectsService.createProyecto(req.body)
        res.status(201).json(proyecto)
    } catch (error) {
        res.status(500).json({ message: "Error al crear el proyecto" })
    }
}

export async function replaceProyecto(req, res) {
    const id = req.params.id
    const { name, description, link, img, technologies, section } = req.body
    
    if (!name || !section) {
        return res.status(400).json({ message: "Campos requeridos: name, section" })
    }
    
    try {
        const proyecto = await projectsService.replaceProyecto(id, req.body)
        res.status(200).json(proyecto)
    } catch (error) {
        res.status(500).json({ message: "Error al reemplazar el proyecto" })
    }
}

export async function updateProyecto(req, res) {
    const id = req.params.id
    
    try {
        const proyecto = await projectsService.updateProyecto(id, req.body)
        res.status(200).json(proyecto)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el proyecto" })
    }
}

export async function deleteProyecto(req, res) {
    const id = req.params.id
    
    try {
        const resultado = await projectsService.deleteProyecto(id)
        res.status(200).json({ message: "Proyecto eliminado", resultado })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el proyecto" })
    }
}