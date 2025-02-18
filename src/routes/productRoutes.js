const express = require('express');
const Product = require('../models/product');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener productos (público)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear producto (solo admins)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new Product({ name, description, price, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar producto (solo admins)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
