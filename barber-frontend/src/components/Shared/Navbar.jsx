import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Barbavore</Link>

      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Registrar</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard/client">Dashboard</Link>
            <button onClick={handleLogout} className="btn-logout">Sair</button>
          </>
        )}
      </div>
    </nav>
  );
}