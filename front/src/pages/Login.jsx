import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../contexts/Session.context"
import { useUsuariosService } from "../services/usuarios.service"

const Login = () => {
  const navigate = useNavigate()
  const login = useLogin()
  const { login: loginService } = useUsuariosService()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const email = e.target.email.value
    const password = e.target.password.value

    loginService({ email, password })
      .then(data => {
        login(data.token, email)
        navigate("/")
      })
      .catch(err => {
        setError("Usuario o contraseña incorrectos")
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-5 shadow' style={{ width: '400px' }}>
        <h2 className='text-center mb-4'>Iniciar Sesión</h2>
        
        {error && <div className='alert alert-danger'>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Email:</label>
            <input 
              type="email" 
              placeholder='Ingrese su email' 
              className='form-control' 
              name='email'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Contraseña:</label>
            <input 
              type="password" 
              placeholder='Ingrese su contraseña' 
              className='form-control' 
              name='password'
              required
            />
          </div>
          <button 
            type='submit' 
            className='btn btn-primary w-100'
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>

        <p className='text-center mt-3'>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  )
}

export default Login