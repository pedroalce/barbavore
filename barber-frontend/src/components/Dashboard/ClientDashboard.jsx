import { useState } from "react";
import AgendaView from "../Agenda/AgendaView";
import HistoryList from "../History/HistoryList";
import ProfileForm from "../Profile/ProfileForm";

const ClientDashboard = () => {
  const [abaAtiva, setAbaAtiva] = useState("agenda");

  return (
    <div>
      <h1>Dashboard Cliente</h1>
      <button onClick={() => setAbaAtiva("agenda")}>Agenda</button>
      <button onClick={() => setAbaAtiva("historico")}>Histórico</button>
      <button onClick={() => setAbaAtiva("perfil")}>Perfil</button>

      {abaAtiva === "agenda" && <AgendaView />}
      {abaAtiva === "historico" && <HistoryList />}
      {abaAtiva === "perfil" && <ProfileForm />}
    </div>
  );
};

export default ClientDashboard;
