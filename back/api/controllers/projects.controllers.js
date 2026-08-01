import * as projectsService from "../../services/projects.services.js"
import { deleteImage } from "../../middlewares/imagenes.upload.js"
//comentario cualquiera para forzar deploy
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
    try {
        const { name, description, link, section, clientId } = req.body
        
        const technologies = req.body.technologies.split(',').map(t => t.trim()).filter(t => t !== '')

        const img = req.file ? `https://parcial2-aplicacioneshibridas2026-production.up.railway.app/uploads/${req.file.filename}` : null
        //dejo esto aca por las dudas http://localhost:3333/uploads/ 

        if (!name || !section) {
            return res.status(400).json({ message: "Campos requeridos: name, section" })
        }

        const proyecto = {
            name,
            description,
            link,
            img,
            technologies,
            section,
            clientId
        }

        const { ObjectId } = await import("mongodb")
        proyecto.clientId = new ObjectId(clientId)

        const result = await projectsService.createProyecto(proyecto)
        res.status(201).json(result)
    } catch (error) {
        console.log("Error:", error)
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
        const proyectoActual = await projectsService.getProyectoById(id)
        
        let proyecto = req.body
        
        if (proyecto.technologies) {
            proyecto.technologies = proyecto.technologies.split(',').map(t => t.trim()).filter(t => t !== '')
        }

        if (proyecto.clientId) {
            const { ObjectId } = await import("mongodb")
            proyecto.clientId = new ObjectId(proyecto.clientId)
        }
        
        if (req.file) {
            proyecto.img = `https://parcial2-aplicacioneshibridas2026-production.up.railway.app/uploads/${req.file.filename}`
            
            if (proyectoActual.img) {
                await deleteImage(proyectoActual.img)
            }
        }

        const result = await projectsService.updateProyecto(id, proyecto)
        res.status(200).json(result)
    } catch (error) {
        console.log("Error:", error)
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