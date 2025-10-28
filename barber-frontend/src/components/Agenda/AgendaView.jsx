import { useState } from 'react'
const START_HOUR = 10;
const END_HOUR = 18;
const SERVICES = [
  { key: 'maquina', label: 'Corte Máquina 1 Pente', value: 20 },
  { key: 'tesoura', label: 'Corte com Tesoura', value: 25 },
  { key: 'barba', label: 'Barba', value: 15 },
  { key: 'sobrancelha', label: 'Sobrancelha', value: 5 },
  { key: 'combo', label: 'Corte + Barba + Sobrancelha', value: 35 }
];

function getTimeSlots() {
  const slots = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    slots.push(`${h.toString().padStart(2, '0')}:30`);
  }
  slots.push(`${END_HOUR}:00`);
  return slots;
}

export default function AgendaView() {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleServiceChange = (key) => {
    setSelectedServices(s =>
      s.includes(key) ? s.filter(k => k !== key) : [...s, key]
    );
  };

  // Duração e valor
  let duration = 0, value = 0;
  if (selectedServices.includes('combo')) {
    duration = 60;
    value = SERVICES.find(s => s.key === 'combo').value;
  } else {
    duration = selectedServices.length > 0 ? 30 : 0;
    value = selectedServices.reduce((sum, k) => sum + (SERVICES.find(s => s.key === k)?.value || 0), 0);
  }

  return (
    <div className="agenda-view">
      <h3>Agendar Corte</h3>
      <label>Data:
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
      </label>
      <div className="services">
        {SERVICES.map(s => (
          <label key={s.key}>
            <input type="checkbox" checked={selectedServices.includes(s.key)} onChange={() => handleServiceChange(s.key)} />
            {s.label} (R${s.value})
          </label>
        ))}
      </div>
      <div className="slots">
        <h4>Horários disponíveis</h4>
        <div className="slots-list">
          {getTimeSlots().map(slot => (
            <button
              key={slot}
              className={selectedSlot === slot ? 'selected' : ''}
              onClick={() => setSelectedSlot(slot)}
              disabled={duration === 0}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      <div className="summary">
        <p>Duração: {duration} min</p>
        <p>Valor total: R$ {value}</p>
        <button disabled={!selectedSlot || duration === 0}>Confirmar Agendamento</button>
      </div>
    </div>
  );
}
