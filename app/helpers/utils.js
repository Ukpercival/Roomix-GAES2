//Para crear los tokens
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function generarToken(usuario) {
    return jwt.sign(
        { id: usuario._id, correo: usuario.correo },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_COOKIE_EXPIRES });
};

export default generarToken;