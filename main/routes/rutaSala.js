const express = require('express');
const router = express.Router();
const { verificarSesion } = require('../controllers/authController');
const administradorSala = require('../models/administradorSala');

router.get('/crearSala', verificarSesion, (req, res) => {
    res.render('crearSala', { usuario: req.session.usuario });
});

router.get('/menu', verificarSesion, (req, res) => {
    res.render('menu', { usuario: req.session.usuario })
});

router.get('/salas', verificarSesion, (req, res)=>{
    res.render('salas', {usuario: req.session.usuario});
})

router.get('/unirseSala', verificarSesion, (req, res) => {
    res.render('unirseSala', { usuario: req.session.usuario});
});

router.get('/chat/:sala', verificarSesion, (req, res) => {
    const { sala } = req.params;
    const salaEncontrada=administradorSala.obtenerSala(sala);
    if (!salaEncontrada) {
        return res.redirect('/unirseSala');
    }
    res.render('chat', {usuario: req.session.usuario, sala: salaEncontrada});
});

module.exports = router;