import express from 'express';
const app = express();

import bcrypt from 'bcryptjs';
import session from 'express-session';
import generarToken from '../helpers/utils.js';
import User from '../models/mongodb/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Configuración de la sesión
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Función de login
async function login(req, res) {
    const { correo, contrasena } = req.body;

    console.log('Datos recibidos:', correo, contrasena); // Log datos recibidos

    if (!correo || !contrasena) {
        console.log('Campos incompletos'); // Log de error
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const usuario = await User.findOne({ correo });
        console.log('Usuario encontrado:', usuario); // Log usuario encontrado

        if (!usuario) {
            console.log('Correo no existe'); // Log correo no encontrado
            return res.status(400).send({ status: "Error", message: "Correo no existe" });
        }

        const contrasenaP = usuario.contrasena;
        console.log('Contraseña en BD:', contrasenaP); // Log contraseña en BD

        const loginTrue = bcrypt.compareSync(contrasena, contrasenaP);
        console.log('Resultado de comparación de contraseñas:', loginTrue); // Log comparación de contraseñas

        if (loginTrue) {
            console.log('Contraseña incorrecta'); // Log contraseña incorrecta
            return res.status(401).send({ status: "Error", message: "Correo o contraseña incorrecta" });
        }

        const token = await generarToken(usuario);
        console.log('Token generado:', token); // Log token generado

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000,
            path: '/'
        };

        res.cookie('jwt', token, cookieOptions);
        res.send({ token, userType: usuario.rol});
        //res.send({ status: "OK", redirect: '/roomie' });
    } catch (err) {
        console.error("Error al procesar la solicitud", err);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

// Función de registro
async function register(req, res) {
    const { nombre, apellido, documento, correo, telefono, contrasena } = req.body;

    console.log('Datos recibidos:', nombre, apellido, documento, correo, telefono, contrasena); // Log datos recibidos

    // Validación de datos
    if (!nombre || !apellido || !documento || !correo || !telefono || !contrasena) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        // Verifica si el correo ya existe en la BD
        const usuarioExistente = await User.findOne({ correo });

        if (usuarioExistente) {
            return res.status(400).send({ status: "Error", message: "El correo ya existe" });
        }

        // Encripta la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(contrasena, salt);

        // Crea un nuevo usuario
        const nuevoUsuario = new User({
            nombre,
            apellido,
            documento,
            correo,
            telefono,
            contrasena: hashpassword,
            rol: 'roomie'
        });

        // Guarda el nuevo usuario en la BD
        await nuevoUsuario.save();

        res.redirect('/login');
    } catch (err) {
        console.error("Error al registrar el usuario", err);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

export const methods = {
    login,
    register,
};
