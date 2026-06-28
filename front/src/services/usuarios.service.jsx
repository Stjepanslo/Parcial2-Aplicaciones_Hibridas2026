import { useApi } from "./api.service";

export const useUsuariosService = () => {
    const { call } = useApi()

    const login = (credenciales) => call("/usuarios/login", "POST", credenciales)
    
    const registro = (email, password, passwordConfirm) => call("/usuarios", "POST", {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    })

    return { login, registro }
}