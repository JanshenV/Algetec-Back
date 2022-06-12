const express = require('express');
const routes = express();

//Controllers
const {
    UserSignUp,
    UserLogin,
    UserProfile
} = require('./controllers/users');

//Middleware
const TokenValidation = require('./middleware/TokenValidation');

routes.post('/usuarios', UserSignUp);
routes.post('/usuarios/login', UserLogin);
routes.use(TokenValidation);
routes.get('/usuarios', UserProfile);
routes.get('/welcome', (req, res) => {
    return res.status(200).json('Bem vindo(a)!');
});


module.exports = routes;