import { supabase } from '../../supabaseClient.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ message: error.message });
    const session = data.session;
    const user = data.user;
    res.json({
      token: session?.access_token,
      user: {
        id: user.id,
        name: user.user_metadata?.name,
        email: user.email,
        role: user.user_metadata?.role || user.app_metadata?.role || 'client'
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao autenticar', error: err.message });
  }
}

export async function register(req, res) {
  try {
    const { name, email, password, role = 'client', birthDate, whatsapp, gender, photoUrl } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role, birthDate, whatsapp, gender, photoUrl }
      }
    });
    if (error) return res.status(400).json({ message: error.message });
    const user = data.user;
    res.status(201).json({ id: user.id, name, email, role });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar', error: err.message });
  }
}
