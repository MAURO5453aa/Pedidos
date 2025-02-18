const express = require('express');
const router = express.Router(); // ✅ Corrección aquí
const User = require('../models/user'); // ✅ Corrección aquí

// Ruta para registrar un usuario
router.post('/', async (req, res) => {  // ✅ Se usa router en lugar de app
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {  // ✅ Se usa router en lugar de app
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // ✅ Exportar correctamente el router
