import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

export const Pedido = mongoose.model('Pedido', pedidoSchema, 'pedidos');
