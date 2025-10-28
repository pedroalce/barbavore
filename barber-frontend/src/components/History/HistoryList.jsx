import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const HistoryList = () => {
  const { user } = useContext(AuthContext);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de fetch do histórico
    setTimeout(() => {
      setHistorico([
        { id: 1, servico: "Corte de cabelo", data: "2025-09-01" },
        { id: 2, servico: "Barba", data: "2025-09-15" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Carregando histórico...</p>;

  return (
    <div>
      <h2>Histórico de {user?.nome || user?.email}</h2>
      <ul>
        {historico.map((item) => (
          <li key={item.id}>
            {item.servico} - {item.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
