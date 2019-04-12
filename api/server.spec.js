const request = require("supertest");
const knex = require("knex");

const server = require("./server.js");
const dbConfig = require("../knexfile.js");

const db = knex(dbConfig.development);

describe("api", () => {
  describe("get /games", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("responds with json", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toMatch(/json/i);
    });

    it("sends correct response object", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });

  describe("post /games", () => {
    afterEach(async () => {
      await db("games").truncate();
    });

    it("responds with 420 error code if info missing", async () => {
      const body = {
        title: "Wreck it Ralph"
      };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(420);
      db("games").truncate();
    });

    it("responds with 201 code", async () => {
      const body = {
        title: "Wreck It Ralph",
        genre: "Arcade",
        releaseYear: 2014
      };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(201);
    });

    it("responds with an array", async () => {
      const body = {
        title: "Wreck it Ralph",
        genre: "Arcade",
        releaseYear: 2014
      };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.body.length).toBe(1);
    });
  });
});
