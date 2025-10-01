import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <span className="logo">BarberApp</span>
      {user && (
        <>
          <span className="user">{user.name} ({user.role})</span>
          <button onClick={logout}>Sair</button>
        </>
      )}
    </nav>
  );
}
