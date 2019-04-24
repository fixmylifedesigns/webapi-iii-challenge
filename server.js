const express = require("express")
const helmet = require("helmet");
const databaseRouter = require('./data/router/databaseRouter')

const server = express()

server.use(express.json())
server.use(helmet())

server.use("/api", databaseRouter)

server.get("/", (req,res) => {
    res.send('<p>working window</p>')
})

// custom shortcuts
const error = (status, message, res) => {
    res.status(status).json({ error: message })
}

module.exports = server;