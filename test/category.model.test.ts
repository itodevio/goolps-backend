import request from "supertest";
import { app } from "../app";

let _id;
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
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  expect(response.statusCode).toBe(200);
});

test("POST /category response content", async () => {
  const response = await request(app).post("/v1/category").send({
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
  let displayName = response.body.displayName;
  expect(displayName).toBe("Vegetais");
});

test("POST /category response no content", async () => {
  const response = await request(app).post("/v1/category").send({});
  expect(response.statusCode).toBe(400);
});

//PUT

test("PUT /category response code", async () => {
  let response = await request(app).post("/v1/category").send({
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  _id = response.body._id;

  response = await request(app).put(`/v1/category/${_id}/update`).send({
    displayName: "Carninha",
    normalizedName: "carninha",
  });
  expect(response.statusCode).toBe(200);
  const displayName = response.body.displayName;
  const normalizedName = response.body.normalizedName;
  expect(displayName).toBe("Carninha");
  expect(normalizedName).toBe("carninha");
});

test("PUT /category response invalid id", async () => {
  let response = await request(app).post("/v1/category").send({
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  _id = response.body._id;

  response = await request(app).put(`/v1/category/InvalidId/update`).send({
    displayName: "Vegetais",
    normalizedName: "carninha",
  });
  expect(response.statusCode).toBe(500);
});

test("PUT /category response no fields to update", async () => {
  let response = await request(app).post("/v1/category").send({
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  _id = response.body._id;

  response = await request(app).put(`/v1/category/${_id}/update`).send({});
  expect(response.statusCode).toBe(400);
});
//DELETE

test("DELETE /category response code", async () => {
  let response = await request(app).post("/v1/category").send({
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  _id = response.body._id;

  response = await request(app).delete(`/v1/category/${_id}/remove`);
  expect(response.statusCode).toBe(200);
});

test("DELETE /category response invalid id", async () => {
  let response = await request(app).post("/v1/category").send({
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  _id = response.body._id;

  response = await request(app).delete(`/v1/category/InvalidId/remove`);
  expect(response.statusCode).toBe(500);
});

afterAll((done) => {
  done();
});
