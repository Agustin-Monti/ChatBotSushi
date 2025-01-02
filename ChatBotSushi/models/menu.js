import mongoose from 'mongoose';

// Esquema para los productos del menú
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  availability: { type: Boolean, required: true },
});

// Modelo para la colección "menu"
export const Menu = mongoose.model('Menu', menuSchema, 'menus');
