import { useState } from 'react';

// Define la interfaz para los elementos del menú
interface MenuItem {
  name: string;
  price: number;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<MenuItem[]>([]);
  const [userInfo, setUserInfo] = useState<{ nombre?: string; correo?: string } | null>(null);

  const normalizeText = (text: string) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const fetchMenu = async () => {
    try {
      const response = await fetch('http://localhost:3000/menu');
      const menuItems: MenuItem[] = await response.json();

      if (menuItems.length === 0) {
        return 'No hay productos en el menú actualmente.';
      }

      setMenu(menuItems);
      return 'Nuestro menú está disponible a continuación.';
    } catch (error) {
      console.error('Error al obtener el menú:', error);
      return 'Hubo un error al obtener el menú. Intenta nuevamente más tarde.';
    }
  };

  const saveOrder = async (nombre: string, correo: string) => {
    const payload = {
      items: orders, // Productos pedidos
      nombre, // Nombre del usuario
      correo, // Correo del usuario
    };

    console.log('Datos a enviar:', payload);

    try {
      const response = await fetch('http://localhost:3000/pedidos/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
  
    setMessages([...messages, `Tú: ${input}`]);
  
    let botResponse = '';
  
    // Verificar horarios
    if (input.toLowerCase().includes('horarios')) {
      botResponse = 'Nuestro horario de atención es de lunes a viernes, de 18:00 a 23:30.';
    } 
    // Verificar si está abierto
    else if (input.toLowerCase().includes('abierto')) {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // Día de la semana (0 = Domingo, 1 = Lunes, ...)
      const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Tiempo en minutos desde medianoche
  
      // Horarios en minutos: 18:00 = 1080 minutos, 23:30 = 1410 minutos
      const openingTime = 18 * 60; // 18:00
      const closingTime = 23 * 60 + 30; // 23:30
  
      // Comprobamos si es un día de lunes a viernes y si la hora actual está dentro del horario
      if (currentDay >= 1 && currentDay <= 5 && currentTime >= openingTime && currentTime <= closingTime) {
        botResponse = '¡Sí, estamos abiertos! Nuestro horario es de lunes a viernes de 18:00 a 23:30.';
      } else {
        botResponse = 'Lo siento, estamos cerrados. Nuestro horario de atención es de lunes a viernes, de 18:00 a 23:30.';
      }
    } 
    // Lógica para el menú
    else if (input.toLowerCase().includes('menu')) {
      botResponse = await fetchMenu();
    } else if (input.toLowerCase().includes('pedir')) {
      const itemName = normalizeText(input.split('pedir ')[1]?.trim() || '');
      const item = menu.find((m) => normalizeText(m.name) === itemName);
  
      if (item) {
        setOrders((prevOrders) => [...prevOrders, item]);
        botResponse = `Has pedido: ${item.name} por $${item.price}. Ahora dime tu nombre.`;
      } else {
        botResponse = 'No encontramos ese producto en el menú. Por favor revisa y pide nuevamente.';
      }
    } else if (!userInfo && input.toLowerCase().includes('mi nombre es')) {
      const nombre = input.split('mi nombre es ')[1]?.trim();
      if (nombre) {
        setUserInfo((prev) => ({ ...prev, nombre }));
        botResponse = `¡Gracias, ${nombre}! Ahora dime tu correo.`;
      } else {
        botResponse = 'Por favor, dime tu nombre para continuar.';
      }
    } else if (userInfo?.nombre && !userInfo.correo && input.toLowerCase().includes('@')) {
      const correo = input.trim();
  
      if (!/\S+@\S+\.\S+/.test(correo)) {
        botResponse = 'Por favor, ingresa un correo válido.';
      } else {
        setUserInfo((prev) => ({ ...prev, correo }));
        botResponse = '¡Perfecto! Ahora procederemos a guardar tu pedido.';
        await saveOrder(userInfo.nombre, correo);
  
        // Aquí vacías el menú después de guardar el pedido
        setMenu([]);  // Esto hace que el menú desaparezca
  
        botResponse += '\n\nAquí están los productos que has pedido:';
        botResponse += '\n' + orders.map((order) => `${order.name} - $${order.price}`).join('\n');
      }
    } else if (input.toLowerCase().includes('mi pedido')) {
      if (orders.length === 0) {
        botResponse = 'Aún no has realizado ningún pedido.';
      } else {
        const orderList = orders.map((order) => `${order.name} - $${order.price}`).join('\n');
        botResponse = `Tus pedidos:\n${orderList}`;
      }
    } else {
      botResponse =
        'Lo siento, no entendí eso. ¿Puedes reformularlo o preguntar algo como "¿Cuál es el menú?"?';
    }
  
    setMessages((prev) => [...prev, `SushiBot: ${botResponse}`]);
    setInput('');
  };
  
  

  return (
    <div
      style={{
        maxWidth: '900px', // Aumento el tamaño del chat
        width: '100%',
        margin: '0 auto',
        fontFamily: "'Arial', sans-serif",
        backgroundColor: '#BDBDBD', // Fondo claro para el chatbot
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#ff6600' }}>Chatbot de Sushi 🍣</h2>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          width: '500px',
          height: '700px', // Aumento la altura para más espacio
          maxHeight: '400px', // Máxima altura permitida
          overflowY: 'scroll',
          marginBottom: '10px',
          backgroundColor: '#fff', // Fondo blanco para el área de mensajes
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              margin: '5px 0',
              padding: '10px',
              backgroundColor: msg.includes('Bot') ? '#f0f0f0' : '#ffebcc', // Fondo claro para el bot y otro para el usuario
              borderRadius: '10px',
              fontSize: '16px',
              lineHeight: '1.5',
              textAlign: msg.includes('Bot') ? 'left' : 'right', // Alineación de los mensajes
              color: '#333', // Color de texto oscuro para buen contraste
            }}
          >
            {msg}
          </p>
        ))}
        {menu.length > 0 && (
          <ul style={{ paddingLeft: '20px', margin: '0' }}>
            {menu.map((item, index) => (
              <li key={index} style={{ marginBottom: '8px', fontSize: '16px', color: '#333' }}>
                <span style={{ fontWeight: 'bold' }}>{item.name}</span> - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{
            flex: '1',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '10px',
            fontSize: '16px',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            background: '#ff6600', // Color naranja para el botón
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Enviar 🍣
        </button>
      </div>
    </div>
  );
  
  
  
  
  
  
};

export default Chatbot;
