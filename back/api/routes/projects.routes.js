import express from "express"
import * as projectsController from "../controllers/projects.controllers.js"

const router = express.Router()

router.get("/proyectos", projectsController.getProyectos)
router.get("/proyectos/:id", projectsController.getProyectoById)
router.post("/proyectos", projectsController.createProyecto)
router.put("/proyectos/:id", projectsController.replaceProyecto)
router.patch("/proyectos/:id", projectsController.updateProyecto)
router.delete("/proyectos/:id", projectsController.deleteProyecto)

export default router