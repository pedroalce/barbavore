import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  // Se não estiver logado, manda para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se tiver restrição de role e o usuário não tiver permissão
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Se passou, renderiza o conteúdo
  return children;
}