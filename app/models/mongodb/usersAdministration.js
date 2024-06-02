import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  documento: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  }
});

const AdminUsers = mongoose.model('AdminUsers', adminSchema);

export default AdminUsers;
