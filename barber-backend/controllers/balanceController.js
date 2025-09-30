import { supabase } from '../../supabaseClient.js';

export async function getBalance(req, res) {
  const { period = 'mensal' } = req.query;
  const now = new Date();
  let start;
  if (period === 'mensal') start = new Date(now.getFullYear(), now.getMonth(), 1);
  else if (period === 'semanal') {
    const day = now.getDay();
    start = new Date(now);
    start.setDate(now.getDate() - day);
  } else if (period === 'anual') start = new Date(now.getFullYear(), 0, 1);
  else start = new Date(0);
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .gte('date', start.toISOString())
      .lte('date', now.toISOString())
      .eq('status', 'finalizado');
    if (error) throw error;
    const total = (data || []).reduce((sum, a) => sum + (a.value || 0), 0);
    res.json({ total, count: (data || []).length, period });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao calcular balanço', error: err.message });
  }
}
