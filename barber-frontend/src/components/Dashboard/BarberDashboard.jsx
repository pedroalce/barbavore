import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getBarberAppointments,
  updateAppointmentStatus,
} from "../../services/appointments";
import "./BarberDashboard.css";

export default function BarberDashboard() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getBarberAppointments(user.email);
        setAppointments(data);
      } catch (err) {
        setFeedback("Erro ao carregar agendamentos.");
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [user.email]);

  const handleConclude = async (id) => {
    try {
      await updateAppointmentStatus(id, "concluído");
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      setFeedback("Agendamento marcado como concluído.");
    } catch (err) {
      setFeedback("Erro ao concluir agendamento.");
    }
  };

  if (loading) return <p>Carregando agendamentos...</p>;

  return (
    <div className="barber-dashboard-container">
      <h3>Agenda do Barbeiro</h3>
      {feedback && <p className="feedback-message">{feedback}</p>}

      {appointments.length === 0 ? (
        <p>Sem agendamentos ativos no momento.</p>
      ) : (
        <ul className="appointments-list">
          {appointments.map((appt) => (
            <li key={appt.id} className="appointment-card">
              <p><strong>Cliente:</strong> {appt.client_email}</p>
              <p><strong>Serviço:</strong> {appt.service}</p>
              <p><strong>Data:</strong> {appt.date}</p>
              <p><strong>Hora:</strong> {appt.time}</p>
              <button onClick={() => handleConclude(appt.id)} className="btn-conclude">
                Concluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}