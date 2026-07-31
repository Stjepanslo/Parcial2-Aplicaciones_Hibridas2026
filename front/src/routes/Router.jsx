import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Detalle from "../pages/Detalle"
import Logout from "../pages/Logout"
import NotFound from "../pages/NotFound"
import NuevoCliente from "../pages/NuevoCliente"
import ClientesList from "../pages/ClientesList"
import EditarCliente from "../pages/EditarCliente"
import EliminarCliente from "../pages/EliminarCliente"
import NuevoProyecto from "../pages/NuevoProyecto"
import ProyectosList from "../pages/ProyectosList"
import EditarProyecto from "../pages/EditarProyecto"
import EliminarProyecto from "../pages/EliminarProyecto"
import ProtectedRoute from "../components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/detalle/:idProyecto",
        element: <ProtectedRoute element={<Detalle />} />
      },
      {
        path: "/clientes",
        element: <ProtectedRoute element={<ClientesList />} />
      },
      {
        path: "/nuevo-cliente",
        element: <ProtectedRoute element={<NuevoCliente />} />
      },
      {
        path: "/editar-cliente/:idCliente",
        element: <ProtectedRoute element={<EditarCliente />} />
      },
      {
        path: "/eliminar-cliente/:idCliente",
        element: <ProtectedRoute element={<EliminarCliente />} />
      },
      {
        path: "/proyectos",
        element: <ProtectedRoute element={<ProyectosList />} />
      },
      {
        path: "/nuevo-proyecto",
        element: <ProtectedRoute element={<NuevoProyecto />} />
      },
      {
        path: "/editar-proyecto/:idProyecto",
        element: <ProtectedRoute element={<EditarProyecto />} />
      },
      {
        path: "/eliminar-proyecto/:idProyecto",
        element: <ProtectedRoute element={<EliminarProyecto />} />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export default router