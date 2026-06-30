import { useForm } from "react-hook-form"
import { useClientesService } from "../services/clientes.service"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const EditarCliente = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm()
    
    const navigate = useNavigate()
    const { idCliente } = useParams()
    const { getClienteById, updateCliente } = useClientesService()
    const [loading, setLoading] = useState(true)
    
    const fotoUrl = watch("foto")

    useEffect(() => {
        getClienteById(idCliente)
            .then(data => {
                setValue("nombre", data.nombre)
                setValue("foto", data.foto)
                setValue("descripcion", data.descripcion)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [idCliente])

    const onSubmit = (formData) => {
        updateCliente(idCliente, {
            nombre: formData.nombre,
            foto: formData.foto,
            descripcion: formData.descripcion
        })
            .then(data => navigate("/clientes"))
            .catch(err => console.log(err))
    }

    if (loading) return <p>Cargando...</p>

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card p-5 shadow">
                        <h2 className="mb-4">Editar Cliente</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    {...register("nombre", { required: "Nombre es requerido" })}
                                />
                                {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Foto (URL):</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    {...register("foto", { required: "Foto es requerida" })}
                                />
                                {errors.foto && <span className="text-danger">{errors.foto.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descripción:</label>
                                <textarea 
                                    className="form-control" 
                                    rows="4"
                                    {...register("descripcion", { required: "Descripción es requerida" })}
                                ></textarea>
                                {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h5 className="mb-3">Vista previa</h5>
                        {fotoUrl ? (
                            <div>
                                <img src={fotoUrl} alt="Preview" className="img-fluid rounded mb-3" />
                                <p className="text-muted small">{fotoUrl}</p>
                            </div>
                        ) : (
                            <div className="alert alert-info">Ingresa una URL de imagen para ver la vista previa</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarCliente