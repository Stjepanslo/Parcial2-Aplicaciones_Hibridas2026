import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import projectRoutes from "./routes/projects.routes.js"
import projectRoutesApi from "./api/routes/projects.routes.js"
import clientRoutes from "./routes/clients.routes.js"
import clientRoutesApi from "./api/routes/clients.routes.js"
import usuariosRoutesApi from "./api/routes/usuarios.routes.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://parcial2-aplicaciones-hibridas2026.vercel.app"
  ],
  credentials: true
}))
app.use("/", express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use(projectRoutes)
app.use(clientRoutes)
app.use("/api", projectRoutesApi)
app.use("/api", clientRoutesApi)
app.use("/api/usuarios", usuariosRoutesApi)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`))