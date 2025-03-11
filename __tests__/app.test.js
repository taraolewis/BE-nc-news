const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of topic objects which have the properties slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBeGreaterThan(1);
        body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });

  describe("GET /api/invalid-endpoints", () => {
    test("404: responds with 'Invalid path' for invalid endpoint", () => {
      return request(app)
        .get("/api/topic")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid path");
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    test("200: Responds with an article object by its ID", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toMatchObject({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: expect.any(String),
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("404: Responds with right status and error message for a valid but non-existent ID", () => {
      return request(app)
        .get("/api/articles/88")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article does not exist");
        });
    });
    test("400: Responds with right status and error message for an invalid ID", () => {
      return request(app)
        .get("/api/articles/not-an-article")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});
