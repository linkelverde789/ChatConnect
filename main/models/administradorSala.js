class AdministradorSala {
    constructor() {
        this.salas = {};
    }
    agregarSala(sala) {
        if (!this.salas[sala.clave]) {
            this.salas[sala.clave] = sala;
        }
    }
    añadirMensaje(mensaje, emisor, sala){
        if (this.salas[sala]) {
            console.log('sala encontrada');
            console.log(`Mensaje: ${mensaje}, emisor: ${emisor}`);
            this.salas[sala].añadirMensaje(emisor, mensaje);
        }
    }
    obtenerSala(clave) {
        return this.salas[clave];
    }
    obtenerTodasLasSalas() {
        return this.salas;
    }
    eliminarSala(clave) {
        delete this.salas[clave];
    }
    obtenerSalasPublicas() {
        return Object.values(this.salas).filter(item => item.privado == false);
    }
    unirSala(clave, usuario) {
        if (this.salas[clave]) {
            this.salas[clave].añadirUsuario(usuario);
        }
    }
    obtenerSalasUnidas(usuario) {
        const salasUnidas = [];
        
        for (const clave in this.salas) {
            const sala = this.salas[clave];
            if (sala.getUsuarios().includes(usuario)) {
                salasUnidas.push(sala);
            }
        }
    
        return salasUnidas;
    }
    salirSala(usuario, clave) {
        if (this.salas[clave]) {
            this.salas[clave].eliminarUsuario(usuario);
        }
    }
}

const administradorSala = new AdministradorSala();
module.exports = administradorSala;