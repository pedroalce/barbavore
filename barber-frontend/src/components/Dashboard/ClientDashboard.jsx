import AgendaView from '../Agenda/AgendaView';
import HistoryList from '../History/HistoryList';
import ProfileForm from '../Profile/ProfileForm';

const TABS = [
  { key: 'agendar', label: 'Agendar Corte' },
  { key: 'historico', label: 'Histórico de Cortes' },
  { key: 'perfil', label: 'Perfil' }
];

export default function ClientDashboard() {
  const [tab, setTab] = useState('agendar');
  return (
    <div>
      <h2>Bem-vindo ao BarberApp!</h2>
      <div className="tabs">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={tab === t.key ? 'active' : ''}>{t.label}</button>
        ))}
      </div>
      <div className="tab-content">
        {tab === 'agendar' && <AgendaView />}
        {tab === 'historico' && <HistoryList />}
        {tab === 'perfil' && <ProfileForm />}
      </div>
    </div>
  );
}
