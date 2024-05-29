const userService = require('../services/userService');

class UserController {

    // Crea el usuario
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error creando el usuario', error });
        }
    }

    // Obtiene todos los usuarios
    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error obteniendo los usuarios', error });
        }
    }

        // Obtiene un usuario por su id
    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error obteniendo el usuario', error });
        }
    }

    // Actualiza un usuario
    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error actualizando el usuario', error });
        }
    }

        // Elimina un usuario
    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error eliminando el usuario', error });
        }
    }
}

module.exports = new UserController();
