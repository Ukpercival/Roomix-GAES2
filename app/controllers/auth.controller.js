import express from 'express';
const app = express();

import bcrypt from 'bcryptjs';
import generarToken from '../helpers/utils.js';
import User from '../models/mongodb/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

async function login(req, res) {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const usuario = await User.findOne({ correo });

        if (!usuario) {
            return res.status(400).send({ status: "Error", message: "Correo no existe" });
        }

        const contrasenaP = usuario.contrasena;

        const loginTrue = await bcrypt.compare(contrasena, contrasenaP);

        if (!loginTrue) {
            return res.status(401).send({ status: "Error", message: "Correo o contraseña incorrecta" });
        }

        const token = await generarToken(usuario);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000,
            path: '/'
        };

        res.cookie('jwt', token, cookieOptions);
        res.send({ token, userType: usuario.rol});
        
    } catch (err) {
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

async function logout(req, res) {
    try {

        if (!req.session) {
            return res.status(400).send({ status: 'Error', message: 'Sesión no encontrada'});
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send({ status: "Error", message: "No se pudo cerrar sesión" });
            }

            res.clearCookie('jwt', { 
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: new Date(0) 
            });
            res.send({ status: "OK", message: "Cierre de sesión exitoso" });
        });
    } catch (err) {
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

async function register(req, res) {
    const { nombre, apellido, documento, correo, telefono, contrasena } = req.body;

    if (!nombre || !apellido || !documento || !correo || !telefono || !contrasena) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const usuarioExiste = await User.findOne({ correo });

        if (usuarioExiste) {
            return res.status(400).send({ status: "Error", message: "El correo ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = new User({
            nombre,
            apellido,
            documento,
            correo,
            telefono,
            contrasena: hashedpassword,
            rol: 'roomie'
        });

        await nuevoUsuario.save();

        res.redirect('/login');
    } catch (err) {
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

export const methods = {
    login,
    logout,
    register,
};
