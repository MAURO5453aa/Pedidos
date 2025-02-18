const express = require('express');
const app = express();
const homeRoutes = require('./src/routes/homeRoutes');
const authRoutes = require('./src/routes/authRoutes'); // Agregar authRoutes
const mongoose = require('mongoose');

app.use(express.json()); // Para manejar JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Para manejar formularios

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', homeRoutes);
app.use('/auth', authRoutes); // Agregar la ruta de autenticación

// Conectar a MongoDB
const MONGO_URI = "mongodb+srv://MAUROPINEDA:MAURO123aa@cluster0.bk8ae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión a MongoDB:", err));

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
