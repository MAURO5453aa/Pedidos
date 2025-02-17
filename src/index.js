const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const app = express();
const port = 3000;

// Conexión a MongoDB Atlas
const uri = "mongodb+srv://MAUROPINEDA:MAURO123aa@cluster0.bk8ae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB Atlas con éxito!"))
  .catch((err) => console.error("Error de conexión a MongoDB Atlas:", err));

// Middleware para procesar JSON
app.use(express.json());

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido al catálogo de productos!');
});

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para agregar un producto
app.post('/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Ruta para obtener un producto por su ID
app.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  // Ruta para actualizar un producto por su ID
app.put('/products/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
  
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// Eliminar un producto por ID
app.delete('/products/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ message: "Producto eliminado con éxito" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
