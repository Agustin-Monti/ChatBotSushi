import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Modelos
import { Menu } from './models/menu.js';
import pedidosRouter from './routes/pedidos.js';


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/sushi-bot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Ruta para obtener el menú
app.get('/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No hay productos en el menú.' });
    }
    res.json(menuItems);
  } catch (error) {
    console.error('Error al obtener el menú:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Usar la ruta de pedidos
app.use('/pedidos', pedidosRouter);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
