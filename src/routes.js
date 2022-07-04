const express = require('express');
const routes = express();

//Controllers
const {
    UserSignUp,
    UserLogin,
    UserProfile,
    GetAllUsers
} = require('./controllers/users');

const {
    CreateIssue,
    DeleteIssue,
    ModifyIssueStatus,
    GetAllIsues,
    DeleteMultiple
} = require('./controllers/issues');

//Middleware
const TokenValidation = require('./middleware/TokenValidation');

routes.get('/', (req, res) => {
    return res.status(200).json('Welcome to Algetec');
});

//User Routes
routes.post('/usuarios/signup', UserSignUp);
routes.post('/usuarios/login', UserLogin);
routes.all(TokenValidation);
routes.get('/usuarios', UserProfile);
routes.get('/usuarios/all', GetAllUsers);

//Issue Routes
routes.get('/issues/all', GetAllIsues);
routes.post('/issues', CreateIssue);
routes.delete('/issues/:id', DeleteIssue);
routes.patch('/issues/:id', ModifyIssueStatus);
routes.delete('/multiple/issues', DeleteMultiple);

module.exports = routes;
