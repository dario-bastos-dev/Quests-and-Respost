const Sequelize = require("sequelize")
const db = require("../db")
const connection = require("../db")

const Resposta = connection.define("resposta", {
          corpo: {
                    type: Sequelize.TEXT,
                    allowNull: false
          },
          perguntaId: {
                  type: Sequelize.INTEGER,
                  allowNull: false  
          }
})

Resposta.sync({ force: false});

module.exports = Resposta;