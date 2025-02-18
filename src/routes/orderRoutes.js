const express = require('express');
const Order = require('../models/order');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener pedidos (solo admins)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear pedido (solo usuarios autenticados)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { user, products, totalPrice } = req.body;
        const newOrder = new Order({ user, products, totalPrice });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
