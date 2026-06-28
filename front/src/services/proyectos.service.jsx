import { useApi } from "./api.service";

export function useProyectosService(){
    const { call } = useApi()

    const getProyectos = (filters = {}) => {
        let uri = "/proyectos"

        const params = new URLSearchParams()
        
                if (filters.section) params.append("section", filters.section)
                    
                if (filters.technology) params.append("technology", filters.technology)
                
                if (params.toString()) uri += "?" + params.toString()
        
        return call(uri, "GET")
    }
    
    const getProyectoById = (idProyecto) => call("/proyectos/" + idProyecto, "GET")
    
    const createProyecto = (proyecto) => call("/proyectos", "POST", proyecto)
    
    const updateProyecto = (idProyecto, proyecto) => call("/proyectos/" + idProyecto, "PATCH", proyecto)
    
    const deleteProyecto = (idProyecto) => call("/proyectos/" + idProyecto, "DELETE")

    return { getProyectos, getProyectoById, createProyecto, updateProyecto, deleteProyecto }
}