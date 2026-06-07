import * as projectsService from "../services/projects.services.js"
import * as projectsView from "../views/projects.views.js"

export function home(req, res) {
    res.send(projectsView.homePage())
}

export async function getProyectosBySection(req, res) {
    const section = req.params.section
    
    try {
        const proyectos = await projectsService.getProyectos({ section })
        res.send(projectsView.createProyectosList(proyectos, section))
    } catch (error) {
        res.send(projectsView.create404Page())
    }
}

export async function getProyectoById(req, res) {
    const id = req.params.id
    
    try {
        const proyecto = await projectsService.getProyectoById(id)
        if (!proyecto) {
            return res.send(projectsView.create404Page())
        }
        res.send(projectsView.createProyectoPage(proyecto))
    } catch (error) {
        res.send(projectsView.create404Page())
    }
}