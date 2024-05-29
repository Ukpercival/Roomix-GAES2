const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
const app = express();

// Configuración específica de CORS
const corsOptions = {
    origin: 'http://127.0.0.7:5500', // Reemplaza con la URL de tu frontend
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
  

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

module.exports = app;
