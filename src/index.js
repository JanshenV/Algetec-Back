require('dotenv').config();
const app = require('./server');
const Migration = require('./seeders/migration');

Migration();

async function runMigration(){
  try{
    await Migration();
  }catch(error){
    console.log(error)
  };
};

runMigration();

app.listen(process.env.PORT || 37);
