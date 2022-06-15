const swaggerAutoGen = require('swagger-autogen');

swaggerAutoGen()('./swagger.json', ['./routes.js']);