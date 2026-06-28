import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLogout } from "../contexts/Session.context"

const Logout = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  useEffect(() => {
    logout()
    navigate("/login")
  }, [])

  return (
    <div className="container text-center mt-5">
      <p>Cerrando sesión...</p>
    </div>
  )
}

export default Logout