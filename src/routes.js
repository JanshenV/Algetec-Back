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
    ModifyIssueStatus
} = require('./controllers/issues');

//Middleware
const TokenValidation = require('./middleware/TokenValidation');


//User Routes
routes.post('/usuarios/signup', UserSignUp);
routes.post('/usuarios/login', UserLogin);
routes.use(TokenValidation);
routes.get('/usuarios', UserProfile);
routes.get('/usuarios/all', GetAllUsers);

//Issue Routes
routes.post('/issues', CreateIssue);
routes.delete('/issues/:id', DeleteIssue);
routes.patch('/issues/:id', ModifyIssueStatus);

module.exports = routes;