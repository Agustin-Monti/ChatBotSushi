import express from 'express';
import { Pedido } from '../models/pedido.js';

const router = express.Router();

// Ruta para crear un nuevo pedido
router.post('/crear', async (req, res) => {
  console.log('Datos recibidos:', req.body);

  const { items, nombre, correo } = req.body;

  if (!items || !nombre || !correo) {
    return res.status(400).json({ message: 'Faltan datos del pedido.' });
  }

  try {
    const nuevoPedido = new Pedido({
      items,
      nombre,
      correo,
    });
    await nuevoPedido.save();
    res.status(201).json({ message: 'Pedido creado exitosamente.' });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});


export default router;
