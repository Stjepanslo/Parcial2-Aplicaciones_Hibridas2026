import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUsuariosService } from "../services/usuarios.service"

const Register = () => {
  const navigate = useNavigate()
  const { registro } = useUsuariosService()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const email = e.target.email.value
    const password = e.target.password.value
    const passwordConfirm = e.target.passwordConfirm.value

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    registro(email, password, passwordConfirm)
      .then(data => {
        alert("Registro exitoso. Por favor inicia sesión.")
        navigate("/login")
      })
      .catch(err => {
        setError(err.message || "Error al registrarse")
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-5 shadow' style={{ width: '400px' }}>
        <h2 className='text-center mb-4'>Registrarse</h2>
        
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
              placeholder='Mínimo 8 caracteres, con mayúscula, número y símbolo' 
              className='form-control' 
              name='password'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Confirmar contraseña:</label>
            <input 
              type="password" 
              placeholder='Confirme su contraseña' 
              className='form-control' 
              name='passwordConfirm'
              required
            />
          </div>
          <button 
            type='submit' 
            className='btn btn-primary w-100'
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </button>
        </form>

        <p className='text-center mt-3'>
          ¿Ya tenes cuenta? <a href="/login">Inicia sesión directamente</a>
        </p>
      </div>
    </div>
  )
}

export default Register