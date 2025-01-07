const express = require('express');
const router = express.Router();
const { verificarSesion } = require('../controllers/authController');
const usuariosAdministrador = require('../models/administradorUsuarios');

router.get('/', (req, res) => {
    console.log('Usuarios registrados:');
    console.log(usuariosAdministrador.obtenerUsuarios());
    res.render('index', { usuario: req.session.usuario ? req.session.usuario : 'Login' });
});

router.get('/login', (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/menu');
    }
    res.render('login', { error: '' });

});

router.post('/login', (req, res) => {
    const nombreUsuario = req.body.usuario;

    if (usuariosAdministrador.comprobarUsuario(nombreUsuario)) {
        return res.render('login', { error: 'El nombre de usuario ' + nombreUsuario + ' no está disponible.' });
    }

    usuariosAdministrador.agregarUsuario(nombreUsuario);

    req.session.usuario = nombreUsuario;

    res.redirect('/menu');
});

router.get('/logout', verificarSesion, (req, res) => {
    let usuario = req.session.usuario;
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("No se pudo destruir la sesión.");
        }
        usuariosAdministrador.eliminarUsuario(usuario);

        //hay que eliminar las salas unidas al usuario, pero lo hace 

        res.render('logout');

        console.log(`El usuario ${usuario} ha cerrado la sesión`);
    });
});

module.exports = router;