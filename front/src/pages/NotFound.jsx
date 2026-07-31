import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4">Página no encontrada</h2>
        <p className="lead mb-4">La página que buscas no existe o fue movida.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound