const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

router.post(
  '/register',
  [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('apellido', 'Apellido es requerido').not().isEmpty(),
    check('documento', 'Documento es requerido').not().isEmpty(),
    check('correo', 'Incluya un correo válido').isEmail(),
    check('telefono', 'Teléfono es requerido').not().isEmpty(),
    check('contrasena', 'Contraseña debe tener 6 o más caracteres').isLength({ min: 6 }),
  ],
  userController.createUser
);

router.post(
  '/login',
  [
    check('correo', 'Incluya un correo válido').isEmail(),
    check('contrasena', 'Contraseña es requerida').exists(),
  ],
  userController.loginUser
);

// Rutas protegidas
router.get('/:id', auth, authorize('admin', 'roomie'), userController.getUserById);
router.put('/:id', auth, authorize('admin', 'roomie'), userController.updateUser);
router.delete('/:id', auth, authorize('admin'), userController.deleteUser);
router.get('/', auth, authorize('admin'), userController.getAllUsers);

// Rutas para el perfil del usuario
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, [
  check('nombre', 'Nombre es requerido').not().isEmpty(),
  check('apellido', 'Apellido es requerido').not().isEmpty(),
  check('documento', 'Documento es requerido').not().isEmpty(),
  check('correo', 'Incluya un correo válido').isEmail(),
  check('telefono', 'Teléfono es requerido').not().isEmpty(),
], userController.updateProfile);

module.exports = router;

