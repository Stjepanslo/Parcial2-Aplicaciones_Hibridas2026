import express from "express"
import * as clientsController from "../controllers/clients.controllers.js"
import { validateTokenMiddleware } from "../../middlewares/token.validate.js"

const router = express.Router()

router.get("/clientes", clientsController.getClientes)
router.get("/clientes/:id", clientsController.getClienteById)
router.post("/clientes", clientsController.createCliente)
router.get("/clientes/:id/proyectos", clientsController.getProyectosByClienteId)
router.patch("/clientes/:id", [validateTokenMiddleware], clientsController.updateCliente)
router.delete("/clientes/:id", [validateTokenMiddleware], clientsController.deleteCliente)

export default router