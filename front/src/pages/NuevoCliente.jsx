import { useForm } from "react-hook-form"
import { useClientesService } from "../services/clientes.service"
import { useNavigate } from "react-router-dom"

const NuevoCliente = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    
    const navigate = useNavigate()
    const { createCliente } = useClientesService()

    const onSubmit = (formData) => {
        createCliente({
            nombre: formData.nombre,
            foto: formData.foto,
            descripcion: formData.descripcion
        })
            .then(data => navigate("/clientes"))
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-5">
            <div className="card p-5 shadow" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <h2 className="mb-4">Nuevo Cliente</h2>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input 
                            type="text" 
                            placeholder="Nombre del cliente" 
                            className="form-control" 
                            {...register("nombre", { required: "Nombre es requerido" })}
                        />
                        {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Foto (URL):</label>
                        <input 
                            type="url" 
                            placeholder="https://picsum.photos/200/200" 
                            className="form-control" 
                            {...register("foto", { required: "Foto es requerida" })}
                        />
                        {errors.foto && <span className="text-danger">{errors.foto.message}</span>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción:</label>
                        <textarea 
                            placeholder="Descripción del cliente" 
                            className="form-control" 
                            rows="4"
                            {...register("descripcion", { required: "Descripción es requerida" })}
                        ></textarea>
                        {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Guardar Cliente</button>
                </form>
            </div>
        </div>
    )
}

export default NuevoCliente