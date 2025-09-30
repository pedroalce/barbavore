import { supabase } from '../../supabaseClient.js';

export async function criarAgendamento({ nome_cliente, servico, horario }) {
  const { data, error } = await supabase
    .from('agendamentos')
    .insert([{ nome_cliente, servico, horario }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function listarAgendamentos() {
  const { data, error } = await supabase
    .from('agendamentos')
    .select('*')
    .order('horario', { ascending: true });

  if (error) throw error;
  return data;
}

export async function atualizarAgendamento(id, updates) {
  const { data, error } = await supabase
    .from('agendamentos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletarAgendamento(id) {
  const { error } = await supabase
    .from('agendamentos')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return { success: true };
}