import { criarAgendamento, listarAgendamentos, atualizarAgendamento, deletarAgendamento } from '../services/agendamentoService.js';

export async function list(req, res) {
  try {
    const items = await listarAgendamentos();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar agendamentos', error: err.message });
  }
}

export async function create(req, res) {
  try {
    const novo = await criarAgendamento(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error: err.message });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const atualizado = await atualizarAgendamento(id, req.body);
    if (!atualizado) return res.status(404).json({ message: 'Agendamento não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error: err.message });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await deletarAgendamento(id);
    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar agendamento', error: err.message });
  }
}
