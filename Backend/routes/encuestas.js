import express from 'express';
import { buscarEncuesta, crearEncuesta, editarEncuesta, eliminarEncuesta, guardarVoto, listarEncuesta } from '../controllers/encuestaController.js';

const router = express.Router();

//Definir ruta para guardar
router.post('/', crearEncuesta);
router.post('/edit', editarEncuesta);
router.post('/votar', guardarVoto);
router.get('/buscar/:id', buscarEncuesta);
router.get('/buscarEncuestas', listarEncuesta);
router.delete('/eliminar', eliminarEncuesta);

export default router;