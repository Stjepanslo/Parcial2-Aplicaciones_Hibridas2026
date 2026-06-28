import { useApi } from "./api.service";

export function useClientesService(){
    const { call } = useApi()

    const getClientes = () => call("/clientes", "GET")
    
    const getClienteById = (idCliente) => call("/clientes/" + idCliente, "GET")
    
    const createCliente = (cliente) => call("/clientes", "POST", cliente)
    
    const getProyectosByCliente = (idCliente) => call("/clientes/" + idCliente + "/proyectos", "GET")

    return { getClientes, getClienteById, createCliente, getProyectosByCliente }
}