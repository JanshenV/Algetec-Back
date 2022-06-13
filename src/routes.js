const express = require('express');
const routes = express();

//Controllers
const {
    UserSignUp,
    UserLogin,
    UserProfile
} = require('./controllers/users');

const {
    CreateIssue,
    DeleteIssue
} = require('./controllers/issues');

//Middleware
const TokenValidation = require('./middleware/TokenValidation');


//User Routes
routes.post('/usuarios', UserSignUp);
routes.post('/usuarios/login', UserLogin);
routes.use(TokenValidation);
routes.get('/usuarios', UserProfile);

//Issue Routes

routes.post('/issues', CreateIssue);
routes.delete('/issues/:id', DeleteIssue);

routes.get('/welcome', (req, res) => {
    return res.status(200).json('Bem vindo(a)!');
});


module.exports = routes;