import { Order } from '../models/order.js';

// Crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    // Validar los datos recibidos
    if (!items || !total) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    // Crear un nuevo pedido
    const newOrder = new Order({ items, total });
    await newOrder.save();

    res.status(201).json({ message: 'Pedido creado exitosamente', order: newOrder });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener todos los pedidos
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
