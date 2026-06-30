import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Detalle from "../pages/Detalle"
import Logout from "../pages/Logout"
import NuevoCliente from "../pages/NuevoCliente"
import ClientesList from "../pages/ClientesList"
import EditarCliente from "../pages/EditarCliente"
import EliminarCliente from "../pages/EliminarCliente"
import ProtectedRoute from "../components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />
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
      }
    ]
  }
])

export default router