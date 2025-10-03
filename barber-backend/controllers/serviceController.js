// barber-backend/controllers/servicesController.js
import supabase from '../supabaseClient.js'

export async function getServices(req, res) {
  const { data, error } = await supabase.from('services').select('*')

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export async function createService(req, res) {
  const { name, duration_minutes, price } = req.body
  const { data, error } = await supabase
    .from('services')
    .insert([{ name, duration_minutes, price }])

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}