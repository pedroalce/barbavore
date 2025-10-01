import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <span style={{ marginRight: "20px" }}>Barbavore</span>

      {user ? (
        <>
          <span style={{ marginRight: "20px" }}>
            Olá, {user.nome || user.email}
          </span>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <span>Bem-vindo, visitante</span>
      )}
    </nav>
  );
};

export default Navbar;
