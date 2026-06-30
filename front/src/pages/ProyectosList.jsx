import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useProyectosService } from "../services/proyectos.service"

const ProyectosList = () => {
  const { getProyectos } = useProyectosService()
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
    getProyectos({ section: filtro })
      .then(data => {
        setProyectos(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Error al cargar proyectos")
        setLoading(false)
      })
  }, [filtro])

  if (loading) return <p>Cargando...</p>
  if (error) return <p className="text-danger">{error}</p>

  const sections = [
    { slug: "web", nombre: "Páginas Web" },
    { slug: "landing", nombre: "Landing Page" },
    { slug: "ecommerce", nombre: "E-commerce" },
    { slug: "cursos", nombre: "Cursos" },
    { slug: "material", nombre: "Material Pedagógico" }
  ]

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="amarillo">Proyectos</h2>
        <Link to="/nuevo-proyecto" className="btn btn-primary">+ Nuevo Proyecto</Link>
      </div>

      <div className="mb-4">
        <h5>Filtrar por sección:</h5>
        <div className="btn-group bg-violeta" role="group">
          <button 
            type="button" 
            className={`btn ${filtro === "" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setFiltro("")}
          >
            Todos
          </button>
          {sections.map(section => (
            <button 
              key={section.slug}
              type="button" 
              className={`btn ${filtro === section.slug ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => setFiltro(section.slug)}
            >
              {section.nombre}
            </button>
          ))}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Sección</th>
            <th>Tecnologías</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No hay proyectos</td></tr>
          ) : (
            proyectos.map(proyecto => (
              <tr key={proyecto._id}>
                <td><strong>{proyecto.name}</strong></td>
                <td>{proyecto.section}</td>
                <td>{proyecto.technologies.join(", ")}</td>
                <td>
                  <Link to={`/editar-proyecto/${proyecto._id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                  <Link to={`/eliminar-proyecto/${proyecto._id}`} className="btn btn-danger btn-sm">Eliminar</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProyectosList