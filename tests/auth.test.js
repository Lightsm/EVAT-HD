const request = require("supertest");
const app = require("../src/app");

describe("AUTH API TESTS", () => {

  it("should return error for empty login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it("should handle register endpoint", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect([200, 201, 400]).toContain(res.statusCode);
  });

});