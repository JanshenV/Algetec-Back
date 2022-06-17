require('dotenv').config();
const app = require('./server');
const Migration = require('./seeders/migration');

async function runSeeder() {
  try {
    await Migration();
  } catch (error) {
    return console.log(error);
  };
};

runSeeder();

app.listen(process.env.PORT || 37);
