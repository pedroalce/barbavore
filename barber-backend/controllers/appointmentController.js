// barber-backend/controllers/appointmentsController.js
import supabase from '../supabaseClient.js'

export async function getAppointments(req, res) {
  const userId = req.headers['x-user-id'] // depois vamos melhorar isso com auth
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export async function createAppointment(req, res) {
  const { user_id, barber_id, service_id, scheduled_at } = req.body
  const { data, error } = await supabase
    .from('appointments')
    .insert([{ user_id, barber_id, service_id, scheduled_at }])

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}

export async function deleteAppointment(req, res) {
  const { id } = req.params
  const userId = req.headers['x-user-id'] // quem está logado

  // garante que só o dono do agendamento pode cancelar
  const { data: appointment, error: fetchError } = await supabase
    .from('appointments')
    .select('id, user_id')
    .eq('id', id)
    .single()

  if (fetchError) return res.status(400).json({ error: fetchError.message })
  if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' })
  if (appointment.user_id !== userId) {
    return res.status(403).json({ error: 'Você não tem permissão para cancelar este agendamento' })
  }

  const { error } = await supabase.from('appointments').delete().eq('id', id)

  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Agendamento cancelado com sucesso' })
}

export async function getAppointmentsForBarber(req, res) {
  const barberId = req.headers['x-barber-id'] // id do barbeiro logado

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id,
      scheduled_at,
      users (id, email),
      services (id, name, price)
    `)
    .eq('barber_id', barberId)
    .order('scheduled_at', { ascending: true })

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export async function updateAppointmentStatus(req, res) {
  const { id } = req.params
  const { status } = req.body
  const barberId = req.headers['x-barber-id'] // barbeiro logado

  // Verifica se o agendamento pertence a este barbeiro
  const { data: appointment, error: fetchError } = await supabase
    .from('appointments')
    .select('id, barber_id')
    .eq('id', id)
    .single()

  if (fetchError) return res.status(400).json({ error: fetchError.message })
  if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' })
  if (appointment.barber_id !== barberId) {
    return res.status(403).json({ error: 'Você não tem permissão para alterar este agendamento' })
  }

  // Atualiza o status
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)

  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Status atualizado com sucesso', data })
}
