import express from "express"
import * as projectsController from "../controllers/projects.controllers.js"
import upload from "../../middlewares/imagenes.upload.js"
import { resizeImage } from "../../middlewares/imagenes.upload.js"
import { validateCreateProyecto, validateUpdateProyecto } from "../../middlewares/proyectos.validate.js"
import { validateTokenMiddleware } from "../../middlewares/token.validate.js"

const router = express.Router()

router.get("/proyectos", projectsController.getProyectos)
router.get("/proyectos/:id", projectsController.getProyectoById)
router.post("/proyectos", 
    validateTokenMiddleware,
    upload.single("img"),
    resizeImage,
    validateCreateProyecto, 
    projectsController.createProyecto
)
router.put("/proyectos/:id", [validateTokenMiddleware, validateUpdateProyecto], projectsController.replaceProyecto)
router.patch("/proyectos/:id", validateTokenMiddleware, upload.single("img"), resizeImage, validateUpdateProyecto, projectsController.updateProyecto)
router.delete("/proyectos/:id", [validateTokenMiddleware], projectsController.deleteProyecto)

export default router