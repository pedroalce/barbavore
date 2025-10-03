import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function BarberDashboard() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:3000/appointments/barber", {
          headers: {
            "x-barber-id": user.id,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAppointments(data);
        } else {
          setMessage("Erro: " + data.error);
        }
      } catch (err) {
        setMessage("Erro de conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:3000/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-barber-id": user.id,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
        setMessage("Status atualizado com sucesso!");
      } else {
        setMessage("Erro: " + data.error);
      }
    } catch (err) {
      setMessage("Erro de conexão com o servidor.");
    }
  };

  if (loading) return <p>Carregando agendamentos...</p>;

  return (
    <div className="barber-dashboard">
      <h2>Painel do Barbeiro</h2>
      {message && <p>{message}</p>}
      {appointments.length === 0 ? (
        <p>Você não tem agendamentos marcados.</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a.id}>
              Cliente: {a.users?.email} | Serviço: {a.services?.name} | Data:{" "}
              {new Date(a.scheduled_at).toLocaleString()} | Status:{" "}
              {a.status || "pendente"}
              <div>
                <button onClick={() => updateStatus(a.id, "concluído")}>
                  Concluir
                </button>
                <button onClick={() => updateStatus(a.id, "cancelado")}>
                  Cancelar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}