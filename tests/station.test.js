const request = require("supertest");
const app = require("../src/app");

describe("STATION API TESTS", () => {

  it("should get all stations", async () => {
    const res = await request(app).get("/api/stations");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should add station", async () => {
    const res = await request(app)
      .post("/api/stations")
      .send({
        name: "Test Station",
        location: "Delhi"
      });

    expect([200, 201]).toContain(res.statusCode);
  });

});