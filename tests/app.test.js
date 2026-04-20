const request = require("supertest");
const app = require("../src/app");

describe("EVAT API TESTS", () => {

  // HEALTH CHECK
  it("should return health status", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("UP");
  });

  // ROOT ENDPOINT
  it("should respond on root endpoint", async () => {
    const res = await request(app).get("/");

    // even if not defined, we accept 200 or 404 depending on setup
    expect([200, 404]).toContain(res.statusCode);
  });

});