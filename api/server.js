const express = require("express");
const knex = require("knex");

const dbConfig = require("../knexfile");
const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

//------ Get ------//
server.get("/games", (req, res) => {
  db("games")
    .then(rows => {
      res.status(200).json(rows);
    })
    .catch(err => {
      res.status(500).json({ error: "Sorry, the game could not be found." });
    });
});

//------ Post ------//
server.post("/games", (req, res) => {
  const body = req.body;
  if (body.title && body.genre) {
    db("games")
      .insert(body)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Sorry, there was an issue adding your game..." });
      });
  } else {
    res
      .status(420)
      .json({ error: "You seem to be missing a title or a genre." });
  }
});

module.exports = server;
