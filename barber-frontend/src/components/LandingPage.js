
import "./LandingPage.css";

export default function LandingPage({ onEnter, onRegister, onForgot }) {
  return (
    <div className="landing-container">
      <div className="overlay">
        <h1 className="title">Barbavore</h1>
        <h2 className="subtitle">Fala comigo, cabeludo!</h2>
        <button className="enter-btn" onClick={onEnter}>
          Entrar
        </button>

        <div className="links">
          <p>
            Não tem conta?{" "}
            <span className="link" onClick={onRegister}>
              Cadastre-se!
            </span>
          </p>
          <p>
            <span className="link" onClick={onForgot}>
              Esqueci a senha
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}