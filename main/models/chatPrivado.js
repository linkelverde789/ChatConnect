class chatPrivado {
    constructor(usuario1, usuario2, codigo) {
        this.usuario1 = usuario1;
        this.usuario2 = usuario2;
        this.codigo = codigo;
        this.mensajes = [];
    }

    añadirMensaje(emisor, mensaje) {
        if (emisor == this.usuario1 || emisor == this.usuario2) {
            this.mensajes.push({ emisor: emisor, mensaje: mensaje });
        }
    }

    getUsuario1() {
        return this.usuario1;
    }
    getUsuario2() {
        return this.usuario2;
    }

    getCodigo() {
        return this.codigo;
    }

    obtenerMensajes() {
        return this.mensajes;
    }

}
module.exports = chatPrivado;