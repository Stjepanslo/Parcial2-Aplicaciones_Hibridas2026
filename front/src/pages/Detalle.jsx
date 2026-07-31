import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useProyectosService } from "../services/proyectos.service"

const Detalle = () => {
  const { idProyecto } = useParams()
  const { getProyectoById } = useProyectosService()
  const [proyecto, setProyecto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getProyectoById(idProyecto)
      .then(data => {
        setProyecto(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Error al cargar el proyecto")
        setLoading(false)
      })
  }, [idProyecto])

  if (loading) return <p>Cargando...</p>
  if (error) return <p className="text-danger">{error}</p>
  if (!proyecto) return <p>Proyecto no encontrado</p>

  return (
    <div>
      <Link to="/" className="btn btn-secondary mb-4">← Volver</Link>
      
      <div className="row">
        <div className="col-md-6">
          {proyecto.img ? (
              <img src={proyecto.img} alt={proyecto.name} className="img-fluid rounded" />
          ) : (
              <div className="alert alert-info">Imagen no disponible</div>
          )}
        </div>
        <div className="col-md-6">
          <h1>{proyecto.name}</h1>
          <p className="lead">{proyecto.description}</p>
          
          <h5>Tecnologías:</h5>
          <div className="mb-3">
            {proyecto.technologies.map(tech => (
              <span key={tech} className="badge bg-primary me-2">{tech}</span>
            ))}
          </div>

          <h5>Sección:</h5>
          <p>{proyecto.section}</p>

          <a href={proyecto.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            Ver Proyecto
          </a>
        </div>
      </div>
    </div>
  )
}

export default Detalle