import yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email("Debe ser un email válido").required("Email es requerido"),
    password: yup.string().required("Contraseña es requerida")
})

export const registerSchema = yup.object({
    email: yup.string().email("Debe ser un email válido").required("Email es requerido"),
    password: yup.string()
        .required("Contraseña es requerida")
        .min(8, "Mínimo 8 caracteres")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
        .matches(/[a-z]/, "Debe contener al menos una minúscula")
        .matches(/[@!$%&?=]/, "Debe contener al menos un carácter especial"),
    passwordConfirm: yup.string()
        .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
        .required("Debe confirmar la contraseña")
})