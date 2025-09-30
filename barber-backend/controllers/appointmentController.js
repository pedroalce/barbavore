
import { supabase } from '../../supabaseClient.js';

// Histórico de agendamentos para o usuário autenticado
export async function getAppointmentsHistory(req, res) {
  try {
    const { role, id } = req.user;
    let builder = supabase.from('appointments').select('*').order('date', { ascending: false });
    if (role === 'client') builder = builder.eq('client', id);
    if (role === 'barber') builder = builder.eq('barber', id);
    const { data, error } = await builder;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico', error: err.message });
  }
}

export async function getAppointments(req, res) {
  try {
    const { role, id } = req.user;
    let builder = supabase.from('appointments').select('*');
    if (role === 'client') builder = builder.eq('client', id);
    if (role === 'barber') builder = builder.eq('barber', id);
    const { data, error } = await builder;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar agendamentos', error: err.message });
  }
}

export async function createAppointment(req, res) {
  try {
    const payload = req.body;
    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error: err.message });
  }
}

export async function updateAppointment(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('appointments')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Agendamento não encontrado' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error: err.message });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.json({ message: 'Agendamento removido' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar agendamento', error: err.message });
  }
}
