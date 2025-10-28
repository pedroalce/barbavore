import "./BarberDashboard.css";

export default function BarberDashboard() {
  // Mock de agendamentos recebidos
  const appointments = [
    {
      id: 1,
      client: "joao@email.com",
      service: "Corte de cabelo",
      date: "2025-10-05",
      time: "14:00",
    },
    {
      id: 2,
      client: "maria@email.com",
      service: "Barba",
      date: "2025-10-07",
      time: "16:30",
    },
  ];

  return (
    <div className="barber-dashboard">
      <h2 className="dashboard-title">Agenda do Barbeiro</h2>

      {appointments.length === 0 ? (
        <p className="no-appointments">Nenhum agendamento por enquanto.</p>
      ) : (
        <ul className="barber-appointments-list">
          {appointments.map((appt) => (
            <li key={appt.id} className="barber-card">
              <div className="barber-info">
                <h4>{appt.service}</h4>
                <p>
                  {new Date(appt.date).toLocaleDateString("pt-BR")} às {appt.time}
                </p>
                <span className="client-email">{appt.client}</span>
              </div>
              <button className="btn-done">Concluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}