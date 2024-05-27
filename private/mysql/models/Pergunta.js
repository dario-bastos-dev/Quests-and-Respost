const Sequelize = require("sequelize")
const db = require("../db")

const Pergunta = db.define("pergunta", {
          titulo: {
                    type: Sequelize.STRING, // Para textos curtos
                    allowNull: false
          },
          descricao: {
                    type: Sequelize.TEXT,// para textos logos
                    allowNul: false
          }
})

Pergunta.sync({force:false})// Para nao forçar a criação caso já exista
.then(() => {})

module.exports = Pergunta;