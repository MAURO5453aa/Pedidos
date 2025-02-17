const express = require('express');
const app = express();
const homeRoutes = require('./src/routes/homeRoutes');

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', homeRoutes);

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
