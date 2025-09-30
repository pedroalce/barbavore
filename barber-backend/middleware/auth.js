import { supabase } from '../../supabaseClient.js';

export async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token ausente' });
  const token = header.split(' ')[1];
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ message: 'Token inválido' });
    const role = data.user.user_metadata?.role || data.user.app_metadata?.role || 'client';
    req.user = { id: data.user.id, role, email: data.user.email };
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

export function isAdmin(req, res, next) {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'barber')) return next();
  res.status(403).json({ message: 'Acesso restrito ao administrador/barbeiro' });
}

export function isOwnerOrAdmin(req, res, next) {
  if (req.user?.role === 'admin' || req.user?.role === 'barber' || req.user?.id === req.params.id) return next();
  res.status(403).json({ message: 'Acesso negado' });
}
