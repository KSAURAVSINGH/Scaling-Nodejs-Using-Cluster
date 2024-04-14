const home = require('../controllers/home')

const handleApis = (app) =>{
    app.get('/', home.welcomeComp);
}

module.exports = handleApis;