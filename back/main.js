import express from "express"
import projectRoutes from "./routes/projects.routes.js"
import projectRoutesApi from "./api/routes/projects.routes.js"
import clientRoutes from "./routes/clients.routes.js"
import clientRoutesApi from "./api/routes/clients.routes.js"

const app = express()

app.use("/", express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(projectRoutes)
app.use(clientRoutes)
app.use("/api", projectRoutesApi)
app.use("/api", clientRoutesApi)

const PORT = 3333

app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`))