import { useForm } from "react-hook-form"
import { useProyectosService } from "../services/proyectos.service"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useClientesService } from "../services/clientes.service"

const NuevoProyecto = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()
    
    const navigate = useNavigate()
    const { createProyecto } = useProyectosService()
    const { getClientes } = useClientesService()
    const [clientes, setClientes] = useState([])
    const [imagenPreview, setImagenPreview] = useState(null)
    const imagenFile = watch("img")

    useEffect(() => {
        getClientes()
            .then(data => setClientes(data))
            .catch(err => console.log(err))
    }, [])

    // Mostrar preview cuando cambia la imagen
    useEffect(() => {
        if (imagenFile && imagenFile.length > 0) {
            const file = imagenFile[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagenPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }, [imagenFile])

    const onSubmit = (formData) => {
        const form = new FormData()
        form.append("name", formData.name)
        form.append("description", formData.description)
        form.append("link", formData.link)
        form.append("technologies", formData.technologies.toString())
        form.append("section", formData.section)
        form.append("clientId", formData.clientId)
        
        if (formData.img && formData.img.length > 0) {
            form.append("img", formData.img[0])
        }

        createProyecto(form)
            .then(data => navigate("/proyectos"))
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <div className="card p-5 shadow">
                        <h2 className="mb-4">Nuevo Proyecto</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input 
                                    type="text" 
                                    placeholder="Nombre del proyecto" 
                                    className="form-control" 
                                    {...register("name", { required: "Nombre es requerido" })}
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descripción:</label>
                                <textarea 
                                    placeholder="Descripción del proyecto" 
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
                                    placeholder="https://ejemplo.com" 
                                    className="form-control" 
                                    {...register("link", { required: "Link es requerido" })}
                                />
                                {errors.link && <span className="text-danger">{errors.link.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen:</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="form-control" 
                                    {...register("img", { required: "Imagen es requerida" })}
                                />
                                {errors.img && <span className="text-danger">{errors.img.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tecnologías (separadas por coma):</label>
                                <input 
                                    type="text" 
                                    placeholder="React, Node.js, MongoDB" 
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

                            <button type="submit" className="btn btn-primary w-100">Guardar Proyecto</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card p-4 shadow">
                        <h5 className="mb-3">Vista previa</h5>
                        {imagenPreview ? (
                            <div>
                                <img src={imagenPreview} alt="Preview" className="img-fluid rounded" />
                            </div>
                        ) : (
                            <div className="alert alert-info">Selecciona una imagen para ver la vista previa</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProyecto