const jwt = require('jsonwebtoken');
const SECRET_KEY = "supersecreto"; // 👈 La misma clave que en authRoutes.js

// Middleware para verificar el token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, token requerido" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });

        req.user = user; // Guardamos la info del usuario en la request
        next();
    });
}

// Middleware para verificar rol de administrador
function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado, solo administradores" });
    }
    next();
}

module.exports = { authenticateToken, isAdmin };
