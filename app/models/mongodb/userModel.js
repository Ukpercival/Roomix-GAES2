import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  documento: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'roomie', 'host'], default: 'roomie' },
}, { timestamps: true });

// Log datos recibidos
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  const { nombre, apellido, documento, correo, telefono, contrasena, rol } = user;
  console.log('User:', { nombre, apellido, documento, correo, telefono, contrasena, rol });
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
