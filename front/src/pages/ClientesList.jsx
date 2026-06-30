import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useClientesService } from "../services/clientes.service"

const ClientesList = () => {
  const { getClientes } = useClientesService()
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getClientes()
      .then(data => {
        setClientes(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Error al cargar clientes")
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="amarillo">Clientes</h2>
        <Link to="/nuevo-cliente" className="btn btn-primary">+ Nuevo Cliente</Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr><td colSpan="3" className="text-center">No hay clientes</td></tr>
          ) : (
            clientes.map(cliente => (
              <tr key={cliente._id}>
                <td><strong>{cliente.nombre}</strong></td>
                <td>{cliente.descripcion.substring(0, 50)}...</td>
                <td>
                  <Link to={`/editar-cliente/${cliente._id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                  <Link to={`/eliminar-cliente/${cliente._id}`} className="btn btn-danger btn-sm">Eliminar</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ClientesList