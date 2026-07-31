import yup from "yup"

export const createProyectoSchema = yup.object({
    name: yup.string().required("El nombre es requerido").min(3, "Mínimo 3 caracteres"),
    description: yup.string().required("La descripción es requerida").min(10, "Mínimo 10 caracteres"),
    link: yup.string().required("El link es requerido").url("Debe ser una URL válida"),
    technologies: yup.string().required("Tecnologías son requeridas"),
    section: yup.string().required("La sección es requerida").oneOf(
        ["web", "landing", "ecommerce", "cursos", "material"],
        "Sección no válida"
    ),
    clientId: yup.string().required("El cliente es requerido")
})

export const updateProyectoSchema = yup.object({
    name: yup.string().min(3, "Mínimo 3 caracteres"),
    description: yup.string().min(10, "Mínimo 10 caracteres"),
    link: yup.string().url("Debe ser una URL válida"),
    technologies: yup.string(), 
    section: yup.string().oneOf(
        ["web", "landing", "ecommerce", "cursos", "material"],
        "Sección no válida"
    ),
    clientId: yup.string()
})