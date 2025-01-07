const { v4: uuidv4 } = require('uuid');
const chatPrivado = require('../models/chatPrivado');

class AdministradorChatPrivado {
    constructor() {
        this.chatsPrivados = {};
    }

    crearChatPrivado(usuario1, usuario2) {
        let sala = this.obtenerChatPrivadoPorUsuarios(usuario1, usuario2);
        if (!sala) {
            const codigo = uuidv4();
            sala = new chatPrivado(usuario1, usuario2, codigo)
            this.chatsPrivados[codigo] = sala;
        }
        return sala;
    }

    obtenerChatPrivadoPorUsuarios(usuario1, usuario2) {
        return Object.values(this.chatsPrivados).find(
            chat =>
                (chat.usuario1 === usuario1 && chat.usuario2 === usuario2) ||
                (chat.usuario1 === usuario2 && chat.usuario2 === usuario1)
        );
    }

    obtenerChatsPrivadosDeUsuario(usuario){
        return Object.values(this.chatsPrivados).find(
            chat =>
                (chat.usuario1 === usuario) || (chat.usuario2 === usuario)
        );
    }

    obtenerChatPrivadoPorCodigo(codigo) {
        return this.chatsPrivados[codigo] || null;
    }

    agregarMensaje(codigo, emisor, mensaje) {
        const chat = this.obtenerChatPrivadoPorCodigo(codigo);
        if (!chat) {
            console.log(`Chat con código ${codigo} no encontrado`);
        }
        chat.añadirMensaje(emisor, mensaje);
    }

    obtenerTodosChatsPrivados() {
        return this.chatsPrivados;
    }
}

const administradorChatPrivado = new AdministradorChatPrivado();
module.exports = administradorChatPrivado;
