import { createContext, useState, useEffect } from "react";

// Criando o contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulação de login
  const login = (email, senha) => {
    setUser({ email });
  };

  // Simulação de cadastro
  const register = (nome, email, senha) => {
    setUser({ nome, email });
  };

  // Simulação de logout
  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Aqui poderíamos buscar user do localStorage ou Supabase
    console.log("AuthContext montado");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
