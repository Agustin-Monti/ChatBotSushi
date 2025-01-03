# Chatbot Sushi

Este proyecto implementa un chatbot para interactuar con clientes de un restaurante de sushi. Permite responder preguntas sobre horarios, menús y más.

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (viene incluido con Node.js)
- [MongoDB](https://www.mongodb.com/) (para la base de datos)

estas Dependencias debes tener en tu package: "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "mongodb": "^6.12.0",
    "mongoose": "^8.9.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }, si no tienes alguna debes instalarlas.

  luego en la terminal ejecuta en la ruta correcta del proyecto un npn run dev

---

## **Instalación**

### 1. Clonar el repositorio
Primero, clona el repositorio desde GitHub:
```bash
git clone https://github.com/tu-usuario/chatbotsushi.git



### Mensajes que entiende el bot

"Consultas sobre horarios"
Mensaje: "¿Cuáles son los horarios?" horarios es la palabra clave
Respuesta: "Estamos abiertos de lunes a viernes de 18:00 a 23:30 horas."

"Consultas sobre abierto"
Mensaje: "¿Hoy están abierto?" abierto es la palabra clave
Respuesta: "Sí, estamos abiertos. Nuestro horario de atención hoy es de 18:00 a 23:30 horas."

"Consultas sobre ubicacion"
Mensaje: "¿Su ubicacion?" ubicacion es la palabra clave
Respuesta: "Estamos ubicados en Calle Principal 123, Ciudad Sushi."

"Consultas sobre menu"
Mensaje: "¿Cuál es el menu?" menu es la palabra clave
Respuesta: "Aparece el menu a continuacion"

"Consultas para pedir"
Mensaje: "pedir [nombre del producto, ejemplo : pedir sushi de salmon ]" 
Respuesta: "Has pedido: ${item.name} por $${item.price}. Ahora dime tu nombre."

Mensaje: "mi nombre es : "mi nombre es" es la oracion clave, ejemplo : mi nombre es agustin " 
Respuesta: "¡Gracias, ${nombre}! Ahora dime tu correo."

Mensaje: "[aqui coloca tu correo solamente ¨coloca un correo valido¨]" 
Respuesta: "¡Gracias, ${nombre}! Ahora dime tu correo."

Respuesta: '¡Perfecto! Ahora procederemos a guardar tu pedido.'


Mensaje: "mi pedido" mi pedido es es la oracion clave, ejemplo : mi pedido
Respuesta: "Tus pedidos: se muestran tus pedidos"


### Datos de ejemplo para MongoDB

Los datos de ejemplo se encuentran en la raiz del proyecto, uno es menu.json la cual son 3 productos, y el otro se guarda automaticamente cuando se realiza un pedido.
Para crear las collections en mongodb entre a mongodb compass y dentro de localhost cree una db llamada sushi-bot, luego ahi si cree las collection menus y pedidos

