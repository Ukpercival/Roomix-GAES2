const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  documento: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'roomie', 'anfitrion'], default: 'roomie' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
