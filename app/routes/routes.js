import express from 'express';
import AdminUsers from '../models/mongodb/usersAdministration';

const router = express.Router();

// Crear
router.post('/', async (req, res) => {
  try {
    const userAdmin = await AdminUsers.create(req.body);
    io.emit('newUser', userAdmin);
    res.json(userAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Leer
router.get('/', async (req, res) => {
  try {
    const userAdmin = await AdminUsers.find();
    res.json(userAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar
router.patch('/:id', async (req, res) => {
  try {
    const userAdmin = await AdminUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(userAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borrar
router.delete('/:id', async (req, res) => {
  try {
    await AdminUsers.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario borrado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search
router.get('/search', async (req, res) => {
    try {
      const query = req.query.q;
      const userAdmin = await AdminUsers.find({ $text: { $search: query } });
      res.json(userAdmin);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
