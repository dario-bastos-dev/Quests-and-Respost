// import components
const express = require(`express`)
const app = express()
const bodyParser = require("body-parser")
const db = require("./mysql/db")
const Pergunta = require("./mysql/models/Pergunta")
const Resposta = require("./mysql/models/Resposta")

// Database MySQL
db.authenticate()
.then(() => {
          console.log("Conexão feita com o Bando de dados")
}).catch((err) => {
          console.log(err)
})

// Active body-parse
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Active ejs
app.set("view engine", "ejs")
app.use(express.static("../public"))

// Routes
app.get("/", (req, res) => {

          Pergunta.findAll({raw:true, order:[
                    ["id", "DESC"] // ASC = crescente e DESC = decrescente
          ]}).then((perguntas) => {
                    res.render("index", {
                              perguntas: perguntas
                    })
          })
})

app.get("/perguntar", (req, res) => {
          res.render("perguntar")
})

app.post("/salvar", (req, res) => {
          let titulo = req.body.titulo
          let desc = req.body.descricao
          // Adicionando dados na tabela
          Pergunta.create({
                    titulo: titulo,
                    descricao: desc
          }).then(() => {
                    res.redirect("/")
          })
})

app.get("/perguntar/:id", (req, res) => {
          let id = req.params.id
          Pergunta.findOne({
                    where: {id: id}

          }).then((pergunta) => {
                    if(pergunta != undefined) {

                              Resposta.findAll({
                                        where: {perguntaId: pergunta.id},
                                        order: [
                                                  ["id", "DESC"]
                                        ]

                              }).then((respostas) => {
                                        res.render("pergunta", {
                                                  pergunta: pergunta,
                                                  respostas: respostas
                                        })
                              })
                    } else {
                              res.render("/")
                    }
          })
})

app.post("/responder", (req, res) => {
          let corpo = req.body.corpo
          let pergunta = req.body.perguntaId

          Resposta.create({
                    corpo: corpo,
                    perguntaId: pergunta

          }).then(() => {
                    res.redirect(`/perguntar/${pergunta}`)
          })
})

// Create server
const port = 4000
app.listen(port, () => {
          console.log("Servidor ativado")
})