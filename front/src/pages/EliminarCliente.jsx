import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useClientesService } from "../services/clientes.service"

const EliminarCliente = () => {
    const [cliente, setCliente] = useState(null)
    const { idCliente } = useParams()
    const { getClienteById, deleteProyecto } = useClientesService()
    const navigate = useNavigate()

    useEffect(() => {
        getClienteById(idCliente)
            .then(data => setCliente(data))
            .catch(err => console.log(err))
    }, [idCliente])

    const handleDelete = (e) => {
        e.preventDefault()
        deleteProyecto(idCliente)
            .then(() => navigate("/clientes"))
            .catch(err => console.log(err))
    }

    if (!cliente) return <p>Cargando...</p>

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <div className="card p-5 shadow" style={{ maxWidth: "400px" }}>
                <h3 className="mb-4">¿Eliminar cliente?</h3>
                <p className="lead">¿Estás seguro de que deseas eliminar a <strong>{cliente.nombre}</strong>?</p>
                
                <form onSubmit={handleDelete} className="d-flex gap-2">
                    <button type="submit" className="btn btn-danger flex-grow-1">Sí, eliminar</button>
                    <Link to="/clientes" className="btn btn-secondary flex-grow-1">Cancelar</Link>
                </form>
            </div>
        </div>
    )
}

export default EliminarCliente