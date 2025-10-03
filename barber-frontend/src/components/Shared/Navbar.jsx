import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // função que você já deve ter no AuthContext
    navigate("/"); // volta para a landing
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Barbavore</h1>
      <ul>
        {!user ? (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <li>
                <Link to="/admin">Dashboard Admin</Link>
              </li>
            )}
            {user.role === "barber" && (
              <li>
                <Link to="/barber">Meus Agendamentos</Link>
              </li>
            )}
            {user.role === "client" && (
              <li>
                <Link to="/client">Meu Painel</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Sair</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}