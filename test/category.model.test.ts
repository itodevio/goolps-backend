import request from "supertest";
import { app } from "../app";

test("POST /category response code", async () => {
  const response = await request(app).post("/v1/category").send({
    name: "Vegetais",
  });
  expect(response.statusCode).toBe(200);
});

test("POST /category response content", async () => {
  const response = await request(app).post("/v1/category").send({
    name: "Vegetais",
  });
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

test("POST /category response no content", async () => {
  const response = await request(app).post("/v1/category").send({});
  expect(response.statusCode).toBe(400);
});

afterAll((done) => {
  done();
});
