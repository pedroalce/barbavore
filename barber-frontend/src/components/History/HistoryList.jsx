
import React, { useEffect, useState, useContext } from 'react';
import { getAppointmentsHistory } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

export default function HistoryList() {
  const { token, user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAppointmentsHistory(token);
        setHistory(data);
      } catch (err) {
        setError('Erro ao buscar histórico');
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchHistory();
  }, [token]);

  if (loading) return <div>Carregando histórico...</div>;
  if (error) return <div>{error}</div>;

  if (!history.length) return <div>Nenhum agendamento encontrado.</div>;

  return (
    <div>
      <h3>Histórico de Cortes</h3>
      <ul>
        {history.map((item) => (
          <li key={item._id}>
            <strong>Data:</strong> {new Date(item.date).toLocaleString()}<br />
            <strong>Serviço:</strong> {item.service?.name || '-'}<br />
            <strong>Cliente:</strong> {item.client?.name || '-'}<br />
            <strong>Barbeiro:</strong> {item.barber?.name || '-'}<br />
            <strong>Status:</strong> {item.status || '-'}
          </li>
        ))}
      </ul>
    </div>
  );
}
