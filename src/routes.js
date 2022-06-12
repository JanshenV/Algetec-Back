const express = require('express');
const routes = express();

//Controllers
const {
    UserSignUp,
    UserLogin
} = require('./controllers/users');



routes.post('/usuarios', UserSignUp);
routes.post('/usuarios/login', UserLogin);
routes.get('/welcome', (req, res) => {
    return res.status(200).json('Bem vindo(a)!');
});


module.exports = routes;