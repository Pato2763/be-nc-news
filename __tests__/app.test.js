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
        const parsedEndpoints = JSON.parse(endpoints);
        expect(body).toEqual({ endpoints: parsedEndpoints });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("GET 200 sends the article corresponsing to the ID given", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(typeof article.author).toBe("string");
        expect(typeof article.title).toBe("string");
        expect(article.article_id).toBe(1);
        expect(typeof article.body).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
  });
  test("GET 400 sends a message outlining why it is a bad request", () => {
    return request(app)
      .get("/api/articles/InvalidID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("GET 404 sends a message outlining why thhe given id has been rejected", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article with given index");
      });
  });
});

describe("GET /api/articles", () => {
  test("GET 200 should get all aricles with the properties in the data file except the body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
      });
  });
  test("GET 200 should have a comment count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        articles.forEach((article) => {
          expect(typeof article.comment_count).toBe("number");
          if (article.article_id === 3) {
            expect(article.comment_count).toBe(2);
          }
        });
      });
  });
  test("GET 200 articles should be sorted in descending order by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});
