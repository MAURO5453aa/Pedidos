const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/catalogo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});
