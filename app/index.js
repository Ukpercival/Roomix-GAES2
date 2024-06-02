import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { methods as authentication } from './controllers/auth.controller.js';
import { isAuthenticated as auth } from './middlewares/authorization.js';
import connectDB from './models/conexion.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.set('port', process.env.PORT || 3000);

connectDB();

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en puerto", app.get('port'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

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

app.get('/reservas', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin', 'reservas.html'));
});

app.get('/hosters', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin', 'hosters.html'));
});

// Módulo roomie (por default)
app.get('/roomieReservs', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'roomie', 'reservs.html'));
});

app.get('/roomieData', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'roomie', 'data.html'));
});

app.get('/roomieSpace', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'roomie', 'space.html'));
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

app.post('/api/logout', authentication.logout);

app.post('/api/register', authentication.register, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});

export default app;
