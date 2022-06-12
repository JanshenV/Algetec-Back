const express = require('express');
const routes = express();

//Controllers
const {
    UserSignUp
} = require('./controllers/users');



routes.post('/usuarios', UserSignUp);
routes.get('/welcome', (req, res) => {
    return res.status(200).json('Bem vindo(a)!');
});


module.exports = routes;