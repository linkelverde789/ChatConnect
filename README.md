# 💬 ChatConnect

**ChatConnect** es un sitio web diseñado para facilitar la creación de salas de chat privadas o públicas, así como chats individuales entre usuarios. Este proyecto utiliza Node.js, EJS, y Socket.IO, y está en desarrollo (desarrollo mis cojones, estoy harto de CSS).

---

# DockerFile
FROM node:20
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["node"]

---

# Comando Docker
```bash
docker build -t pruebanodejs .
````

```bash
docker run -it -v ruta/al/proyecto:/usr/src/app -p 3000:3000 pruebanodejs /bin/bash
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para gestionar el servidor web y rutas.
- **EJS**: Motor de plantillas para renderizado dinámico de vistas.
- **Socket.IO**: Comunicación en tiempo real mediante WebSockets.
- **Express-session**: Para manejo y almacenamiento de sesiones de usuario.

---

## 🚀 Instalación y Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/linkelverde789/ChatConnect.git
