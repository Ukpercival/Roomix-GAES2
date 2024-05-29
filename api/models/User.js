const mongoose = require('mongoose');

// Definición del esquema de usuarios para crearlos en el JSON
const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true}, // Campo autoincremental
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
