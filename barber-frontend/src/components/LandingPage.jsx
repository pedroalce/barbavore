import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Fala comigo cabeludo!</h1>
        <p>Agende sua visita no Barbarvore.</p>

        <div className="landing-buttons">
          <Link to="/login" className="btn-primary">Entrar</Link>
          <Link to="/register" className="btn-secondary">Criar Conta</Link>
        </div>
      </div>
    </div>
  );
}