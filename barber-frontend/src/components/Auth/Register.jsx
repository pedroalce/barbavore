import React, { useState } from 'react';
import { registerUser } from '../../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', birthDate: '', email: '', whatsapp: '', password: '', gender: 'masculino', photoUrl: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(form);
      setSuccess('Cadastro realizado! Faça login.');
      setError('');
    } catch (err) {
      setError('Erro ao cadastrar.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Cadastro</h2>
      <input name="name" placeholder="Nome completo" value={form.name} onChange={handleChange} required />
      <input name="birthDate" type="date" placeholder="Data de nascimento" value={form.birthDate} onChange={handleChange} required />
      <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
      <input name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Senha" value={form.password} onChange={handleChange} required />
      <select name="gender" value={form.gender} onChange={handleChange} required>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
      </select>
      <input name="photoUrl" placeholder="URL da foto" value={form.photoUrl} onChange={handleChange} />
      <button type="submit">Cadastrar</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
}
