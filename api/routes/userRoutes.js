const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Rutas para el CRUD de usuarios
router.get('/users', (req, res) => userController.getUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUsers(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;
