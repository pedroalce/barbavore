import { useState } from "react";
import "./AppointmentForm.css";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agendamento enviado:", formData);
    // aqui você conecta com o Supabase futuramente
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Agendar Horário</h3>

      <label>
        Data
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Hora
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Serviço
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          <option value="corte">Corte de cabelo</option>
          <option value="barba">Barba</option>
          <option value="combo">Corte + Barba</option>
        </select>
      </label>

      <button type="submit" className="btn-submit">
        Confirmar
      </button>
    </form>
  );
}