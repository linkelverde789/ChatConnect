class Sala {
    constructor(clave, creador, privado, capacidad) {
        this.clave = clave;
        this.creador = creador;
        this.privado = privado;
        this.capacidad = capacidad;
        this.usuarios = [];
        this.mensajes = [];
    }

    // Método para obtener la clave de la sala
    getClave() {
        return this.clave;
    }

    // Método para obtener el creador de la sala
    getCreador() {
        return this.creador;
    }

    // Método para obtener la privacidad de la sala
    getPrivado() {
        return this.privado;
    }

    // Método para obtener la capacidad máxima de la sala
    getCapacidad() {
        return this.capacidad;
    }

    // Método para obtener los usuarios actuales en la sala
    getUsuarios() {
        return this.usuarios;
    }

    obtenerUsuario(usuario) {
        const usuarioEncontrado = this.usuarios.find(item => item === usuario);
        return usuarioEncontrado === usuario;
    }

    getCantidad() {
        return this.usuarios.length;
    }

    añadirUsuario(usuario) {
        if (this.usuarios.length < this.capacidad && !this.obtenerUsuario(usuario)) {
            this.usuarios.push(usuario);
        }
    }
    eliminarUsuario(usuario) {
        const index = this.usuarios.indexOf(usuario);
        if (index !== -1) {
            this.usuarios.splice(index, 1);
        }
    }

    estaLlena() {
        return this.usuarios.length >= this.capacidad;
    }

    añadirMensaje(emisor, mensaje) {
        const objetoMensaje = { emisor: emisor, mensaje: mensaje };
        console.log(objetoMensaje);
        this.mensajes.push(objetoMensaje);
    }

    obtenerMensajes() {
        return this.mensajes;
    }
}

module.exports = Sala;
