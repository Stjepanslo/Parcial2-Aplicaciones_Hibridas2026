import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useProyectosService } from "../services/proyectos.service"
import { useClientesService } from "../services/clientes.service"
import Banner from "../components/Banner"


const Home = () => {
  const { getProyectos } = useProyectosService()
  const { getClientes } = useClientesService()
  
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const [filtroSection, setFiltroSection] = useState("")
  const [proyectosPorSection, setProyectosPorSection] = useState([])
  
  const [filtroCliente, setFiltroCliente] = useState("")
  const [proyectosPorCliente, setProyectosPorCliente] = useState([])

  // Cargar clientes
  useEffect(() => {
    getClientes()
      .then(data => setClientes(data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const filtros = {}
    if (filtroSection) filtros.section = filtroSection
    
    getProyectos(filtros)
      .then(data => {
        setProyectosPorSection(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Error al cargar proyectos")
        setLoading(false)
      })
  }, [filtroSection])


    useEffect(() => {
      getProyectos({})
        .then(data => {
          if (filtroCliente) {
            const filtered = data.filter(p => p.clientId === filtroCliente)
            setProyectosPorCliente(filtered)
          } else {
            setProyectosPorCliente(data)
          }
        })
        .catch(err => console.log(err))
    }, [filtroCliente])

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
      <Banner />
      <h2 className="mb-4 amarillo">Proyectos <span className="font1">por Sección</span></h2>
      
      <div className="mb-4">
        <h3>Filtrar por sección:</h3>
        <div className="btn-group bg-violeta" role="group">
          <button 
            type="button" 
            className={`btn ${filtroSection === "" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setFiltroSection("")}
          >
            Todas
          </button>
          {sections.map(section => (
            <button 
              key={section.slug}
              type="button" 
              className={`btn ${filtroSection === section.slug ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => setFiltroSection(section.slug)}
            >
              {section.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="row mb-5">
        {proyectosPorSection.length === 0 ? (
          <p style={{ color: "#ff0000" }}>No hay proyectos en esta sección</p>
        ) : (
          proyectosPorSection.map(proyecto => (
            <div key={proyecto._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={proyecto.img} className="card-img-top" alt={proyecto.name} />
                <div className="card-body">
                  <h5 className="card-title">{proyecto.name}</h5>
                  <p className="card-text">{proyecto.description}</p>
                  <p className="small">
                    <strong>Tecnologías:</strong> {proyecto.technologies.join(", ")}
                  </p>
                  <div>
                    <Link to={`/detalle/${proyecto._id}`} className="btn btn-primary btn-sm">
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <hr className="my-5" />

      <h2 className="mb-4 amarillo">Proyectos <span className="font1">por Cliente</span></h2>
      
      <div className="mb-4">
        <h3>Filtrar por cliente:</h3>
        <div className="btn-group bg-violeta" role="group">
          <button 
          type="button" 
          className={`btn ${filtroCliente === "" ? "btn-info" : "btn-outline-info"}`}
          onClick={() => setFiltroCliente("")}
          >
          Todos
          </button>
          {clientes.map(cliente => (
            <button 
              key={cliente._id}
              type="button" 
              className={`btn ${filtroCliente === cliente._id ? "btn-info" : "btn-outline-info"}`}
              onClick={() => setFiltroCliente(cliente._id)}
            >
              {cliente.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        {proyectosPorCliente.length === 0 ? (
        <p style={{ color: "#ff0000" }}>Haz click en "Todos" para ver todos los proyectos</p>
        ) : (
          proyectosPorCliente.map(proyecto => (
            <div key={proyecto._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={proyecto.img} className="card-img-top" alt={proyecto.name} />
                <div className="card-body">
                  <h5 className="card-title">{proyecto.name}</h5>
                  <p className="card-text">{proyecto.description}</p>
                  <p className="small">
                    <strong>Tecnologías:</strong> {proyecto.technologies.join(", ")}
                  </p>
                  <div>
                    <Link to={`/detalle/${proyecto._id}`} className="btn btn-primary btn-sm">
                      Ver más
                    </Link>
                  </div>
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