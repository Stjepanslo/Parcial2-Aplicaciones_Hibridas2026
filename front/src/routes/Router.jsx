import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Detalle from "../pages/Detalle"
import Logout from "../pages/Logout"
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