import express from "express"
import * as clientsController from "../controllers/clients.controllers.js"

const router = express.Router()

router.get("/clientes", clientsController.getClientes)
router.get("/clientes/:id", clientsController.getClienteById)
router.post("/clientes", clientsController.createCliente)
router.get("/clientes/:id/proyectos", clientsController.getProyectosByClienteId)

export default router