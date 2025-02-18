const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// 📌 Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "La contraseña es requerida" });
        }

        console.log("🔹 Contraseña antes de encriptar:", password);

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("🔹 Contraseña encriptada:", hashedPassword);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 📌 Ruta para login de usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        console.log("🔹 Contraseña ingresada:", password);
        console.log("🔹 Contraseña almacenada en BD:", user.password);

        // Comparar contraseñas
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("🔹 ¿Contraseña válida?", isPasswordValid);

        if (!isPasswordValid) return res.status(400).json({ message: "Contraseña incorrecta" });

        // Generar token JWT
        const token = jwt.sign({ userId: user._id }, "clave_secreta", { expiresIn: "1h" });
        res.json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
