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
test("POST /category success", async () => {
  const response = await request(app).post("/v1/category").send({
    _id:"613e613e6d4c50535f945798",
    displayName: "Carnes",
    normalizedName: "carnes",
  });
  expect(response.statusCode).toBe(200);
  let displayName = response.body.displayName;
  let normalizedName = response.body.normalizedName;
  expect(displayName).toBe("Carnes");
  expect(normalizedName).toBe("carnes");
});


test("POST /category response no content", async () => {
  const response = await request(app).post("/v1/category").send({});
  expect(response.statusCode).toBe(400);
});

//PUT

test("PUT /category success", async () => {
  const response = await request(app).put(`/v1/category/613e613e6d4c50535f945798/update`).send({
    displayName: "Vegetais",
    normalizedName: "vegetais",
  });
  expect(response.statusCode).toBe(200);
  const displayName = response.body.displayName;
  const normalizedName = response.body.normalizedName;
  expect(displayName).toBe("Vegetais");
  expect(normalizedName).toBe("vegetais");
});

test("PUT /category response invalid id", async () => {
  const response = await request(app).put(`/v1/category/InvalidId/update`).send({
    displayName: "Bebidas",
    normalizedName: "bebidas",
  });
  expect(response.statusCode).toBe(500);
});

test("PUT /category response no fields to update", async () => {
  const response = await request(app).put(`/v1/category/613e613e6d4c50535f945798/update`).send({});
  expect(response.statusCode).toBe(400);
});
//DELETE

test("DELETE /category success", async () => {
  let response = await request(app).post("/v1/category").send({
    displayName: "Lanches",
    normalizedName: "lanches",
  });
  let _id = response.body._id;

  response = await request(app).delete(`/v1/category/${_id}/remove`);
  expect(response.statusCode).toBe(200);
});

test("DELETE /category response invalid id", async () => {
  const response = await request(app).delete(`/v1/category/InvalidId/remove`);
  expect(response.statusCode).toBe(500);
});

afterAll((done) => {
  done();
});
