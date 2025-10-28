import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getClientAppointments,
  updateAppointmentStatus,
} from "../services/appointments";
import "./MyAppointments.css";

export default function MyAppointments() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getClientAppointments(user.email);
        setAppointments(data);
      } catch (err) {
        setFeedback("Erro ao carregar agendamentos.");
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [user.email]);

  const handleCancel = async (id) => {
    try {
      await updateAppointmentStatus(id, "cancelado");
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      setFeedback("Agendamento cancelado com sucesso.");
    } catch (err) {
      setFeedback("Erro ao cancelar agendamento.");
    }
  };

  if (loading) return <p>Carregando agendamentos...</p>;

  return (
    <div className="appointments-container">
      <h3>Meus Agendamentos</h3>
      {feedback && <p className="feedback-message">{feedback}</p>}

      {appointments.length === 0 ? (
        <p>Você não tem agendamentos ativos.</p>
      ) : (
        <ul className="appointments-list">
          {appointments.map((appt) => (
            <li key={appt.id} className="appointment-card">
              <p><strong>Serviço:</strong> {appt.service}</p>
              <p><strong>Data:</strong> {appt.date}</p>
              <p><strong>Hora:</strong> {appt.time}</p>
              <button onClick={() => handleCancel(appt.id)} className="btn-cancel">
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}