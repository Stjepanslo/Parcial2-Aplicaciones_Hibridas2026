import express from "express"
import * as clientsController from "../controllers/clients.controllers.js"
import { validateTokenMiddleware } from "../../middlewares/token.validate.js"
import { validateCreateCliente, validateUpdateCliente } from "../../middlewares/clientes.validate.js"

const router = express.Router()

router.get("/clientes", clientsController.getClientes)
router.get("/clientes/:id", clientsController.getClienteById)
router.post("/clientes", [validateTokenMiddleware, validateCreateCliente], clientsController.createCliente)
router.patch("/clientes/:id", [validateTokenMiddleware, validateUpdateCliente], clientsController.updateCliente)
router.delete("/clientes/:id", [validateTokenMiddleware], clientsController.deleteCliente)
router.get("/clientes/:id/proyectos", clientsController.getProyectosByClienteId)

export default router