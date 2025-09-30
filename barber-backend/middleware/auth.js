import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token ausente' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}

export async function isAdmin(req, res, next) {
  const user = await User.findById(req.user.id);
  if (user && (user.role === 'admin' || user.role === 'barber')) return next();
  res.status(403).json({ message: 'Acesso restrito ao administrador/barbeiro' });
}

export async function isOwnerOrAdmin(req, res, next) {
  const user = await User.findById(req.user.id);
  if (user.role === 'admin' || user.role === 'barber' || req.user.id === req.params.id) return next();
  res.status(403).json({ message: 'Acesso negado' });
}
