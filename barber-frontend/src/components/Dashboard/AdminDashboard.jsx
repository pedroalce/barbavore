import { useState } from "react";
import AgendaView from "../Agenda/AgendaView";
import HistoryList from "../History/HistoryList";

const AdminDashboard = () => {
  const [abaAtiva, setAbaAtiva] = useState("agenda");

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <button onClick={() => setAbaAtiva("agenda")}>Agenda</button>
      <button onClick={() => setAbaAtiva("historico")}>Histórico</button>

      {abaAtiva === "agenda" && <AgendaView />}
      {abaAtiva === "historico" && <HistoryList />}
    </div>
  );
};

export default AdminDashboard;
