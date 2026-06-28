import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout