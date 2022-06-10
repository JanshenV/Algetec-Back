const express = require('express');
const routes = express();


routes.get('/welcome', (req, res) => {
    return res.status(200).json('Bem vindo(a)!');
});


module.exports = routes;