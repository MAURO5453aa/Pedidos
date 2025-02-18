const express = require('express');
const router = express.Router(); // ✅ Corrección aquí
const Order = require('../models/order'); // ✅ Corrección aquí

// Ruta para crear un pedido
router.post('/', async (req, res) => {  // ✅ Se usa router en lugar de app
    try {
        const { user, products, totalPrice } = req.body;
        const newOrder = new Order({ user, products, totalPrice });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para obtener todos los pedidos
router.get('/', async (req, res) => {  // ✅ Se usa router en lugar de app
    try {
        const orders = await Order.find().populate('user').populate('products');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // ✅ Exportar correctamente el router
