import express from 'express';
import NodeCache from 'node-cache';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { methods as authentication } from './controllers/auth.controller.js';
import { isAuthenticated as auth } from './middlewares/authorization.js';
import connectDB from './models/conexion.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configura el servidor
const app = express();
app.set('port', process.env.PORT || 3000);

connectDB();

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en puerto", app.get('port'));
});

// Configura el servidor para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());

// Configura el servidor para parsear JSON y datos urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas públicas
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});

/* *** Rutas de los módulos *** */

// Módulo administrador
app.get('/admin', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin', 'admin.html'));
});

// Módulo roomie (por default)
app.get('/roomie', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'roomie', 'roomies.html'));
});

// Módulo hoster
app.get('/hosterPost', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'host', 'hosterPost.html'));
});

app.get('/hosterView', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'host', 'hosterView.html'));
});

// Ruta de la API
app.post('/api/login', authentication.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});
app.post('/api/register', authentication.register, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});

export default app;
