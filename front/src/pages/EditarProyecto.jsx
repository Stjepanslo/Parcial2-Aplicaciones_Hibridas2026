import { useForm } from "react-hook-form"
import { useProyectosService } from "../services/proyectos.service"
import { useClientesService } from "../services/clientes.service"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const EditarProyecto = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm()
    
    const navigate = useNavigate()
    const { idProyecto } = useParams()
    const { getProyectoById, updateProyecto } = useProyectosService()
    const { getClientes } = useClientesService()
    const [loading, setLoading] = useState(true)
    const [clientes, setClientes] = useState([])
    
    const imgUrl = watch("img")

    useEffect(() => {
        getClientes()
            .then(data => setClientes(data))
            .catch(err => console.log(err))

        getProyectoById(idProyecto)
            .then(data => {
                setValue("name", data.name)
                setValue("description", data.description)
                setValue("link", data.link)
                setValue("img", data.img)
                setValue("technologies", data.technologies.join(", "))
                setValue("section", data.section)
                setValue("clientId", data.clientId)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [idProyecto])

    const onSubmit = (formData) => {
        updateProyecto(idProyecto, {
            name: formData.name,
            description: formData.description,
            link: formData.link,
            img: formData.img,
            technologies: formData.technologies.split(",").map(t => t.trim()),
            section: formData.section,
            clientId: formData.clientId
        })
            .then(data => navigate("/proyectos"))
            .catch(err => console.log(err))
    }

    if (loading) return <p>Cargando...</p>

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <div className="card p-5 shadow">
                        <h2 className="mb-4">Editar Proyecto</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    {...register("name", { required: "Nombre es requerido" })}
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descripción:</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3"
                                    {...register("description", { required: "Descripción es requerida" })}
                                ></textarea>
                                {errors.description && <span className="text-danger">{errors.description.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Link:</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    {...register("link", { required: "Link es requerido" })}
                                />
                                {errors.link && <span className="text-danger">{errors.link.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen (URL):</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    {...register("img", { required: "Imagen es requerida" })}
                                />
                                {errors.img && <span className="text-danger">{errors.img.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tecnologías (separadas por coma):</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    {...register("technologies", { required: "Tecnologías son requeridas" })}
                                />
                                {errors.technologies && <span className="text-danger">{errors.technologies.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Sección:</label>
                                <select 
                                    className="form-control" 
                                    {...register("section", { required: "Sección es requerida" })}
                                >
                                    <option value="">Selecciona una sección</option>
                                    <option value="web">Páginas Web</option>
                                    <option value="landing">Landing Page</option>
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="cursos">Cursos</option>
                                    <option value="material">Material Pedagógico</option>
                                </select>
                                {errors.section && <span className="text-danger">{errors.section.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Cliente:</label>
                                <select 
                                    className="form-control" 
                                    {...register("clientId", { required: "Cliente es requerido" })}
                                >
                                    <option value="">Selecciona un cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
                                    ))}
                                </select>
                                {errors.clientId && <span className="text-danger">{errors.clientId.message}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card p-4 shadow">
                        <h5 className="mb-3">Vista previa</h5>
                        {imgUrl ? (
                            <div>
                                <img src={imgUrl} alt="Preview" className="img-fluid rounded mb-3" />
                                <p className="text-muted small">{imgUrl}</p>
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

export default EditarProyecto