const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const swaggerUi = require('swagger-ui-express');


const app = express();

app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));
app.use(routes);


module.exports = app;