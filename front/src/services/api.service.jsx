import { useNavigate } from "react-router-dom";
import { useToken } from "../contexts/Session.context";

export function useApi() {

    const token = useToken()
    const navigate = useNavigate()

    const call = (uri, method = "GET", body = null) => {
        const options = {
            method: method,
            headers: {}
        }

        if (token) {
            options.headers["Authorization"] = `Bearer ${token}`
        }

        if (body) {
            if (body instanceof FormData) {
                options.body = body
            } else {
                options.headers["Content-Type"] = "application/json"
                options.body = JSON.stringify(body)
            }
        }

        return fetch("https:///api" + uri, options)
            .then(res => {
                if (res.ok) return res.json()
                if (res.status == 401) navigate("/login")
                
                if (res.status == 400) {
                    return res.json().then(data => {
                        const error = new Error("Validación fallida")
                        error.errors = data.errors
                        throw error
                    })
                }
                
                throw new Error("Error en la petición")
            })
    }

    return { call }
}
