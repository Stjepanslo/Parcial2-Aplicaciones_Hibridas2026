import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useProyectosService } from "../services/proyectos.service"

const EliminarProyecto = () => {
    const [proyecto, setProyecto] = useState(null)
    const { idProyecto } = useParams()
    const { getProyectoById, deleteProyecto } = useProyectosService()
    const navigate = useNavigate()

    useEffect(() => {
        getProyectoById(idProyecto)
            .then(data => setProyecto(data))
            .catch(err => console.log(err))
    }, [idProyecto])

    const handleDelete = (e) => {
        e.preventDefault()
        deleteProyecto(idProyecto)
            .then(() => navigate("/proyectos"))
            .catch(err => console.log(err))
    }

    if (!proyecto) return <p>Cargando...</p>

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <div className="card p-5 shadow" style={{ maxWidth: "400px" }}>
                <h3 className="mb-4">¿Eliminar proyecto?</h3>
                <p className="lead">¿Estás seguro de que deseas eliminar <strong>{proyecto.name}</strong>?</p>
                
                <form onSubmit={handleDelete} className="d-flex gap-2">
                    <button type="submit" className="btn btn-danger flex-grow-1">Sí, eliminar</button>
                    <Link to="/proyectos" className="btn btn-secondary flex-grow-1">Cancelar</Link>
                </form>
            </div>
        </div>
    )
}

export default EliminarProyecto