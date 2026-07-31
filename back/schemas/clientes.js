import yup from "yup"

export const createClienteSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido").min(3, "Mínimo 3 caracteres"),
    descripcion: yup.string().required("La descripción es requerida").min(10, "Mínimo 10 caracteres")
})

export const updateClienteSchema = yup.object({
    nombre: yup.string().min(3, "Mínimo 3 caracteres"),
    descripcion: yup.string().min(10, "Mínimo 10 caracteres")
})