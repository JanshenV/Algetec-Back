require('dotenv').config();
const app = require('./server');
const Migration = require('./seeders/migration');

Migration();

app.listen(process.env.PORT || 37);
