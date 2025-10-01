import AgendaView from '../Agenda/AgendaView';
import HistoryList from '../History/HistoryList';
// import ValidateAppointments from '../Dashboard/ValidateAppointments';
// import BalanceView from '../Balance/BalanceView';
// import ServiceConfigForm from '../ServiceConfig/ServiceConfigForm';

const TABS = [
  { key: 'agenda', label: 'Agenda do Dia' },
  { key: 'historico', label: 'Histórico de Cortes' },
  { key: 'validar', label: 'Validação de Agendamentos' },
  { key: 'balanco', label: 'Balanço' },
  { key: 'config', label: 'Configuração de Serviços' }
];

export default function BarberDashboard() {
  const [tab, setTab] = useState('agenda');
  return (
    <div>
      <h2>Dashboard do Barbeiro</h2>
      <div className="tabs">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={tab === t.key ? 'active' : ''}>{t.label}</button>
        ))}
      </div>
      <div className="tab-content">
        {tab === 'agenda' && <AgendaView />}
        {tab === 'historico' && <HistoryList />}
        {/* {tab === 'validar' && <ValidateAppointments />} */}
        {/* {tab === 'balanco' && <BalanceView />} */}
        {/* {tab === 'config' && <ServiceConfigForm />} */}
      </div>
    </div>
  );
}
