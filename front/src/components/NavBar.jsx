import { Link } from "react-router-dom"
import { useEmail, useLogout } from "../contexts/Session.context"

const NavBar = () => {
    const email = useEmail()
    const logout = useLogout()

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Portfolio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        
                        {!email && (
                            <>
                                <Link className="nav-link" to="/login">Login</Link>
                                <Link className="nav-link" to="/register">Registro</Link>
                            </>
                        )}

                        {email && (
                            <>
                                <span className="nav-link">{email}</span>
                                <Link className="nav-link" to="/logout">Salir</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar