const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index.js");
const fs = require("node:fs/promises");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("REQUEST /api/pathThatDoesntExist", () => {
  test("404 invalid path", () => {
    return request(app)
      .get("/api/pathNotExist")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("route not found");
      });
  });
});

describe("GET /api/topics", () => {
  test("GET 200 sends an array of topics with slug and description as keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api", () => {
  test("GET 200 sends an array of all the valid endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const endpoints = fs.readFile("endpoints.json", "utf-8");
        return Promise.all([body, endpoints]);
      })
      .then(([body, endpoints]) => {
        console.log(body);
        console.log(endpoints);
        const parsedEndpoints = JSON.parse(endpoints);
        expect(body).toEqual({ endpoints: parsedEndpoints });
      });
  });
});
