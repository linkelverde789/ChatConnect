class AdministradorUsuarios {
    constructor() {
        this.usuarios = {};
    }
    agregarUsuario(usuario) {
        if (!this.usuarios[usuario]) {
            this.usuarios[usuario] = usuario;
        }

    }
    obtenerUsuario(usuario) {
        return this.usuarios[usuario];
    }
    obtenerUsuarios() {
        return this.usuarios;
    }
    eliminarUsuario(usuario) {
        delete this.usuarios[usuario];
    }
    comprobarUsuario(usuario) {
        return this.usuarios[usuario];
    }
}

const administradorUsuarios = new AdministradorUsuarios;
module.exports = administradorUsuarios;