import { createPage } from "../page/utils.js"

export function createClientesList(clientes) {
    let html = "<h2>Clientes</h2>"
    html += "<ul>"
    
    if (clientes.length === 0) {
        html += "<li>No hay clientes registrados</li>"
    } else {
        clientes.forEach(cliente => {
            html += `<li>`
            html += `<h3>${cliente.nombre}</h3>`
            html += `<img src="${cliente.foto}" width="150" alt="${cliente.nombre}">`
            html += `<p>${cliente.descripcion}</p>`
            html += `<a href="/cliente/${cliente._id}">Ver perfil</a>`
            html += `</li>`
        })
    }
    
    html += "</ul>"
    html += `<a href="/">← Volver al menú</a>`
    
    return createPage(html)
}

export function createClientePage(cliente) {
    let html = `<h2>${cliente.nombre}</h2>`
    html += `<img src="${cliente.foto}" width="300" alt="${cliente.nombre}">`
    html += `<p>${cliente.descripcion}</p>`
    html += `<a href="/cliente/${cliente._id}/proyectos">Ver proyectos de este cliente</a>`
    html += `<br>`
    html += `<a href="/clientes">← Volver a clientes</a>`
    
    return createPage(html)
}

export function createProyectosClienteList(cliente, proyectos) {
    let html = `<h2>Proyectos de ${cliente.nombre}</h2>`
    html += "<ul>"
    
    if (proyectos.length === 0) {
        html += "<li>Este cliente no tiene proyectos</li>"
    } else {
        proyectos.forEach(proyecto => {
            html += `<li>`
            html += `<h3>${proyecto.name}</h3>`
            html += `<p>${proyecto.description}</p>`
            html += `<a href="/proyecto/${proyecto._id}">Ver proyecto</a>`
            html += `</li>`
        })
    }
    
    html += "</ul>"
    html += `<a href="/clientes">← Volver a clientes</a>`
    
    return createPage(html)
}

export function create404Page() {
    let html = "<h1>404 - Página no encontrada</h1>"
    html += `<a href="/">← Volver al menú</a>`
    
    return createPage(html)
}