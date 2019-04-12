const express = require("express");
const knex = require("knex");

const dbConfig = require("../knexfile");
const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

server.get("/games", (req, res) => {
  db("games")
    .then(rows => {
      res.status(200).json(rows);
    })
    .catch(err => {
      res.status(500).json({ error: "Sorry, the game could not be found." });
    });
});

module.exports = server;
