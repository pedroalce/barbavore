import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await resetPassword(email);
      setMessage("Email de redefinição enviado com sucesso!");
    } catch (err) {
      setError("Erro ao enviar email. Verifique o endereço e tente novamente.");
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2 className="forgot-title">Recuperar Senha</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <label>
          Email
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn-forgot">Enviar</button>

        <div className="forgot-links">
          <Link to="/login">Voltar ao login</Link>
        </div>
      </form>
    </div>
  );
}