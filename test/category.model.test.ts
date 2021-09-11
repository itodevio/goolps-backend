import { StoredProductCategory } from "../src/routes/v1/Category/interface";
import request from "supertest";
import { app } from "../app";


//GET
test("GET /category response code", async () => {
  const response = await request(app).get("/v1/category");
  expect(response.statusCode).toBe(200);
});

test("GET /category response content", async () => {
  const response = await request(app).get("/v1/category");
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});
//POST

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

//PUT

test("PUT /category response code", async () => {
  const response = await request(app).put(`/v1/category/${_id}/update`).send({
    name: "Vegetais",
  });
  expect(response.statusCode).toBe(200);
});

test("PUT /category response no id", async () => {
  const response = await request(app).put(`/v1/category/`).send({
    name: "Vegetais",
  });
  expect(response.statusCode).toBe(400);
});

test("PUT /category response invalid id", async () => {
  const response = await request(app).put(`/v1/category/`).send({
    name: "Vegetais",
  });
  expect(response.statusCode).toBe(400);
});

test("PUT /category response no fields to update", async () => {
  const response = await request(app).put(`/v1/category/${_id}/update`).send({});
  expect(response.statusCode).toBe(500);
});
//DELETE

test("DELETE /category response code", async () => {
  const response = await request(app).delete(`/v1/category/${_id}/remove`)
  expect(response.statusCode).toBe(200);
});

test("DELETE /category response no id", async () => {
  const response = await request(app).delete(`/v1/category/`)
  expect(response.statusCode).toBe(400);
});

test("DELETE /category response invalid id", async () => {
  const response = await request(app).delete(`/v1/category/`)
  expect(response.statusCode).toBe(500);
});

afterAll((done) => {
  done();
});
