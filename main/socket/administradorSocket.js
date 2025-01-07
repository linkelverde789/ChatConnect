const Sala = require('../models/sala');
const chatPrivado = require('../models/chatPrivado');

const administradorSala = require('../models/administradorSala');
const administradorChatPrivado = require('../models/administradorChatPrivado');

module.exports = (io) => {
    io.on('connection', (socket) => {

        //salas
        socket.on('obtenerSalasUnidas', (usuario) => {
            socket.emit('recibirSalasUnidas', administradorSala.obtenerSalasUnidas(usuario));
        });

        socket.on('obtenerSalas', () => {
            const salasPublicas = administradorSala.obtenerSalasPublicas();
            io.emit('recibirSalas', salasPublicas);
        });

        socket.on('crearSala', ({ datosFormulario, usuario }) => {
            if (administradorSala.obtenerSala(datosFormulario.claveSala)) {
                return socket.emit('error', `La sala ${datosFormulario.claveSala} ya existe`);
            }

            if (datosFormulario.capacidad < 1) {
                return socket.emit('error', `La capacidad de la sala no puede ser menor a 1`);
            }

            const salaNueva = new Sala(datosFormulario.claveSala, usuario, datosFormulario.privado, datosFormulario.capacidad);

            salaNueva.añadirUsuario(usuario);
            administradorSala.agregarSala(salaNueva);

            const salasPublicas = administradorSala.obtenerSalasPublicas();
            io.emit('recibirSalas', salasPublicas);
            socket.emit('exito', datosFormulario.claveSala);
        });

        socket.on('comprobar', ({ claveSala, usuario }) => {
            const sala = administradorSala.obtenerSala(claveSala);

            if (!sala.obtenerUsuario(usuario)) {
                return socket.emit('prohibido');
            }
            socket.join(claveSala);
            io.to(claveSala).emit('actualizarCantidad', sala.getCantidad());
            socket.emit('exito', sala.obtenerMensajes());
        });

        socket.on('unirse', ({ claveSala, usuario }) => {
            const sala = administradorSala.obtenerSala(claveSala);
            if (!sala) {
                return socket.emit('error', `La sala ${claveSala} no existe`);
            }

            if (sala.estaLlena()) {
                return socket.emit('error', 'La sala está llena');
            }

            const usuarioEncontrado = sala.obtenerUsuario(usuario);
            if (!usuarioEncontrado) {
                administradorSala.unirSala(claveSala, usuario);
            }

            socket.emit('exito', claveSala);
        });

        socket.on('enviarMensaje', ({ mensaje, emisor, claveSala }) => {

            const sala = administradorSala.obtenerSala(claveSala);
            if (!sala) {
                return socket.emit('error', `La sala ${claveSala} no existe`);
            }
            administradorSala.añadirMensaje(mensaje, emisor, claveSala);

            io.to(claveSala).emit('recibirMensaje', { emisor: emisor, mensaje: mensaje });

        });

        socket.on('salirSala', ({ usuario, claveSala }) => {
            administradorSala.salirSala(usuario, claveSala);
            io.to(claveSala).emit('actualizarCantidad', administradorSala.obtenerSala(claveSala).getCantidad());
            socket.leave(claveSala);
            socket.emit('prohibido');
        })

        //chat Privado

        socket.on('asignarSocket', (clave) => {

            if (!clave) {
                return;
            }
            const chatPrivado = administradorChatPrivado.obtenerChatPrivadoPorCodigo(clave);
            if (!chatPrivado) {
                return;
            }

            socket.join(clave);
            socket.emit('recuperarMensajes', (chatPrivado.obtenerMensajes()));
        });

        socket.on('enviarMensajePrivado', ({ emisor, mensaje, codigo }) => {
            if (!emisor) {
                return socket.emit('error', 'El emisor del mensaje es nulo');
            }
            if (!mensaje) {
                return socket.emit('error', 'El mensaje es nulo');
            }
            if (!codigo) {
                return socket.emit('error', 'El código de la sala es nulo');
            }

            administradorChatPrivado.agregarMensaje(codigo, emisor, mensaje);
            io.to(codigo).emit('recibirMensajePrivado', { emisor: emisor, mensaje: mensaje });
        });

        socket.on('logout', (usuario) => {
            console.log(Object.keys(socket.rooms));
            const salasUnidas = administradorSala.obtenerSalasUnidas(usuario);
            salasUnidas.forEach(item => {
                socket.leave(item.clave);
                // administradorSala.salirSala(usuario, item.clave);
            });
        });

        // socket.on('disconnect', ()=>{

        // });
    });
};
