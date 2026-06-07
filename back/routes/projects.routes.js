import express from "express"
import * as projectsController from "../controllers/projects.controllers.js"

const route = express.Router()

// Ruta para secciones
route.get("/", projectsController.home)

// Ruta para mostrar sección específica
route.get("/proyectos/:section", projectsController.getProyectosBySection)

// Ruta para mostrar de a un proyecto 
route.get("/proyecto/:id", projectsController.getProyectoById)

export default route