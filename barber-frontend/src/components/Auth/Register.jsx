import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // padrão cliente
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // aqui salvamos o papel do usuário
      },
    });

    if (error) {
      setMessage("Erro: " + error.message);
    } else {
      setMessage("Cadastro realizado! Verifique seu e-mail para confirmar.");
    }
  };

  return (
    <div className="register-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Cliente</option>
          <option value="barber">Barbeiro</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}