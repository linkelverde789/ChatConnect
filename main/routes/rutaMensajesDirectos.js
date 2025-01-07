const express = require('express');
const router = express.Router();
const { verificarSesion } = require('../controllers/authController');
const administradorChatPrivado = require('../models/administradorChatPrivado');
const usuariosAdministrador = require('../models/administradorUsuarios');
const administradorUsuarios = require('../models/administradorUsuarios');

router.get('/usuarios', verificarSesion, (req, res) => {
    const usuarios = usuariosAdministrador.obtenerUsuarios();
    res.render('usuarios', { usuarios: Object.keys(usuarios) });
});
router.get('/chatsPrivados', verificarSesion, (req, res) => {
    res.render('usuarios', { usuario: req.session.usuario, iniciados: administradorChatPrivado.obtenerChatsPrivadosDeUsuario(req.session.usuario) });
});


router.get('/chatPrivado/:usuario', verificarSesion, (req, res) => {
    const { usuario } = req.params;

    if (!administradorUsuarios.obtenerUsuario(usuario)) {
        return res.redirect('/usuarios');
    }
    if (req.session.usuario == usuario) {
        return res.redirect('/usuarios');
    }

    let chatPrivado = administradorChatPrivado.obtenerChatPrivadoPorUsuarios(req.session.usuario, usuario)

    if (!chatPrivado) {
        chatPrivado = administradorChatPrivado.crearChatPrivado(req.session.usuario, usuario);
    }
    res.render('chatPrivado', { chat: chatPrivado, usuarioSesion: req.session.usuario, otroUsuario: usuario });
});


module.exports = router;