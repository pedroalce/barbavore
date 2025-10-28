const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Register failed');
  return res.json();
}


// Busca histórico de agendamentos do usuário autenticado
export async function getAppointmentsHistory(token) {
  const res = await fetch(`${API_URL}/appointments/history`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Erro ao buscar histórico');
  return res.json();
}

// Funções para agendamentos
export async function getAgendamentos(token) {
  const res = await fetch(`${API_URL}/agendamentos`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Erro ao buscar agendamentos');
  return res.json();
}

export async function createAgendamento(data, token) {
  const res = await fetch(`${API_URL}/agendamentos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao criar agendamento');
  return res.json();
}

export async function updateAgendamento(id, data, token) {
  const res = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao atualizar agendamento');
  return res.json();
}

export async function deleteAgendamento(id, token) {
  const res = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Erro ao deletar agendamento');
  return res.json();
}
