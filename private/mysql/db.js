// Active sequelize
const Sequelize = require("sequelize")
// Create connection with Database Mysql
const connection = new Sequelize("guia_perguntas", "root", "D@riojose06", {
          host: 'localhost',
          dialect: 'mysql'
})

// Export connection
module.exports = connection;