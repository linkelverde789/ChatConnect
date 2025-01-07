const express = require('express');
const http = require('http');
const session = require('express-session');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Rutas
const rutaAuth = require('./routes/rutaAuth');
const rutaSala = require('./routes/rutaSala');
const rutaMensajesDirectos = require('./routes/rutaMensajesDirectos');

// Socket
const administradorSocket = require('./socket/administradorSocket');

// Configuración de la app
app.set("view engine", "ejs");
app.set("views", "./views/");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'albondiga',
    resave: false,
    saveUninitialized: true,
}));

// Rutas
app.use(rutaAuth);
app.use(rutaSala);
app.use(rutaMensajesDirectos);

// Configuración de sockets
administradorSocket(io);

// Iniciar el servidor
server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
