import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AppointmentForm from "../AppointmentForm";
import MyAppointments from "../../MyAppointments";


export default function ClientDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="client-dashboard">
      <h2>Bem-vindo, {user?.email}</h2>

      <section>
        <h3>Agendar novo horário</h3>
        <AppointmentForm />
      </section>

      <section>
        <MyAppointments />
      </section>
    </div>
  );
}