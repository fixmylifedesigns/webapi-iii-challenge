const express = require('express')

const userDb = require("../helpers/userDb")
const postDb = require("../helpers/postDb")

const router = express.Router();

// custom shortcuts
const error = (status, message, res) => {
    res.status(status).json({ error: message })
}

//







module.exports = router;