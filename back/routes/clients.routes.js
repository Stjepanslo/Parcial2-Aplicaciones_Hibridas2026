import express from "express"
import * as clientsController from "../controllers/clients.controllers.js"

const route = express.Router()

route.get("/clientes", clientsController.getClientes)
route.get("/cliente/:id", clientsController.getClienteById)
route.get("/cliente/:id/proyectos", clientsController.getProyectosByClienteId)

export default route