import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Senha incorreta' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function register(req, res) {
  const { name, birthDate, email, whatsapp, password, gender, role, photoUrl } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'E-mail já cadastrado' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, birthDate, email, whatsapp, password: hash, gender, role, photoUrl });
  res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
}
