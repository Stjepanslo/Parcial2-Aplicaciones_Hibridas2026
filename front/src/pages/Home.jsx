import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useProyectosService } from "../services/proyectos.service"

const Home = () => {
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

  const sections = [
    { slug: "web", nombre: "Páginas Web" },
    { slug: "landing", nombre: "Landing Page" },
    { slug: "ecommerce", nombre: "E-commerce" },
    { slug: "cursos", nombre: "Cursos" },
    { slug: "material", nombre: "Material Pedagógico" }
  ]

  if (loading) return <p>Cargando...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div>
      <h1 className="mb-4">Mis Proyectos</h1>
      
      <div className="mb-4">
        <h5>Filtrar por sección:</h5>
        <div className="btn-group" role="group">
          <button 
            type="button" 
            className={`btn ${filtro === "" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFiltro("")}
          >
            Todos
          </button>
          {sections.map(section => (
            <button 
              key={section.slug}
              type="button" 
              className={`btn ${filtro === section.slug ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setFiltro(section.slug)}
            >
              {section.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        {proyectos.length === 0 ? (
          <p>No hay proyectos en esta categoría</p>
        ) : (
          proyectos.map(proyecto => (
            <div key={proyecto._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={proyecto.img} className="card-img-top" alt={proyecto.name} />
                <div className="card-body">
                  <h5 className="card-title">{proyecto.name}</h5>
                  <p className="card-text">{proyecto.description}</p>
                  <p className="small">
                    <strong>Tecnologías:</strong> {proyecto.technologies.join(", ")}
                  </p>
                  <Link to={`/detalle/${proyecto._id}`} className="btn btn-primary btn-sm">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home