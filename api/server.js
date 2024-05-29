const cors = require('cors');
const app = require('./app');
const userRoutes = require('./routes/userRoutes');

// Configuración de CORS
app.use(cors()); // Esto permite que cualquier origen acceda a la API

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
