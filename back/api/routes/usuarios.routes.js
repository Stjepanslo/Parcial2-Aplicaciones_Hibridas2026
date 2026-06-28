import express from "express"
import * as usuariosController from "../controllers/usuarios.controllers.js"
import { validateLogin, validateRegister } from "../../middlewares/usuarios.validate.js"

    const router = express.Router()

router.post("/login", [validateLogin], usuariosController.login)
router.post("/", [validateRegister], usuariosController.createUser)

export default router
