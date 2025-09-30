import { SERVICES } from '../models/Service.js';

export function getServices(req, res) {
  res.json(SERVICES);
}

export function updateService(req, res) {
  // Para simplificação, apenas retorna os novos valores enviados
  // Em produção, salve em banco/config
  res.json({ updated: req.body });
}
