import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import { list, create, update, remove } from '../controllers/agendamentoController.js';

const router = express.Router();

router.get('/', auth, list);
router.post('/', auth, create);
router.put('/:id', auth, isAdmin, update);
router.delete('/:id', auth, isAdmin, remove);

export default router;
