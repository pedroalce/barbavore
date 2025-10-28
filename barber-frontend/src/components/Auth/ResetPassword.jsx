import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./ResetPassword.css";

export default function ResetPassword() {
  const { updatePassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await updatePassword(formData.password);
      setMessage("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Erro ao redefinir senha. Tente novamente.");
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2 className="reset-title">Redefinir Senha</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <label>
          Nova Senha
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirmar Nova Senha
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-reset">Salvar</button>
      </form>
    </div>
  );
}