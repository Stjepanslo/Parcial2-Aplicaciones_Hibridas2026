export function createPage(content) {
    let html = ""
    html += `<!DOCTYPE html>`
    html += `<html lang="es">`
    html += `<head>`
    html += `<meta charset="UTF-8">`
    html += `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    html += `<title>Portfolio Esteban</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">`
    html += `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>`
    html += `<style>`
    html += `.text-shadow-sm { text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); }`
    html += `</style>`
    html += `</head>`
    html += `<body class="d-flex flex-column min-vh-100">`
    html += `<header class="bg-warning py-5">`
    html += `<h1 class="text-center text-white m-0 text-shadow-sm">Portfolio de Esteban Oven</h1>`
    html += `</header>`
    html += `<main class="flex-grow-1">`
    html += `<p class="m-3">Te presento algunos proyectos reales y otros que no lo son pero estan en proceso. Gracias por tu visita</p>`
    html += content
    html += `</main>`
    html += `<footer class="bg-dark text-white text-center py-4 mt-5">`
    html += `<p class="mb-0">&copy; Esteban Oven. Aplicaciones Hibridas. Davinci 2026.</p>`
    html += `</footer>`
    html += `</body>`
    html += `</html>`
    return html
}