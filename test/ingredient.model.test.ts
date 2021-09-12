import request from "supertest";
import { app } from "../app";

let _id;
//GET
test("GET /ingredients response code", async () => {
  const response = await request(app).get("/v1/ingredients");
  expect(response.statusCode).toBe(200);
});

test("GET /ingredients response content", async () => {
  const response = await request(app).get("/v1/ingredients");
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

//POST

test("POST /ingredients success", async () => {
  const response = await request(app).post("/v1/ingredients").send({
    name: "Carne",
    qtt: 10,
    unit: "kg",
    lotNumber: 1,
    description: "carne",
  });
  expect(response.statusCode).toBe(200);
  let name = response.body.name;
  let qtt = response.body.qtt;
  let unit = response.body.unit;
  let lotNumber = response.body.lotNumber;
  let description = response.body.description;
  expect(name).toBe("Carne");
  expect(qtt).toBe(10);
  expect(unit).toBe("kg");
  expect(lotNumber).toBe(1);
  expect(description).toBe("carne");
});

test("POST /ingredients missing field other than name", async () => {
  const response = await request(app).post("/v1/ingredients").send({
    name: "Carne",
    qtt: 10,
    unit: "kg",
    description: "carne",
  });
  expect(response.statusCode).toBe(200);
});


test("POST /ingredients response no name", async () => {
  const response = await request(app).post("/v1/ingredients").send({
    qtt: 10,
    unit: "kg",
    lotNumber: 1,
    description: "carne",
  });
  expect(response.statusCode).toBe(400);
});

//PUT

test("PUT /ingredients success", async () => {
  let response = await request(app).post("/v1/ingredients").send({
    name: "Carne",
    qtt: 10,
    unit: "kg",
    lotNumber: 1,
    description: "carne",
  });
  _id = response.body._id;

  response = await request(app).put(`/v1/ingredients/${_id}/update`).send({
    name: "Agua",
    qtt: 10,
    unit: "L",
    lotNumber: 2,
    description: "agua",
  });
  expect(response.statusCode).toBe(200);
  let name = response.body.name;
  let qtt = response.body.qtt;
  let unit = response.body.unit;
  let lotNumber = response.body.lotNumber;
  let description = response.body.description;
  expect(name).toBe("Agua");
  expect(qtt).toBe(10);
  expect(unit).toBe("L");
  expect(lotNumber).toBe(2);
  expect(description).toBe("agua");
});

test("PUT /ingredients response invalid id", async () => {
  const response = await request(app).put(`/v1/ingredients/InvalidId/update`).send({
    name: "Agua",
    qtt: 10,
    unit: "L",
    lotNumber: 2,
    description: "agua",
  });
  expect(response.statusCode).toBe(500);
});

test("PUT /ingredients response no fields to update", async () => {
  let response = await request(app).post("/v1/ingredients").send({
    name: "Agua",
    qtt: 10,
    unit: "L",
    lotNumber: 2,
    description: "agua",
  });
  _id = response.body._id;

  response = await request(app).put(`/v1/ingredients/${_id}/update`).send({});
  expect(response.statusCode).toBe(400);
});
//DELETE

test("DELETE /ingredients success", async () => {
  let response = await request(app).post("/v1/ingredients").send({
    name: "Agua",
    qtt: 10,
    unit: "L",
    lotNumber: 2,
    description: "agua",
  });
  _id = response.body._id;

  response = await request(app).delete(`/v1/ingredients/${_id}/remove`);
  expect(response.statusCode).toBe(200);
});

test("DELETE /ingredients response invalid id", async () => {
  let response = await request(app).post("/v1/ingredients").send({
    name: "Agua",
    qtt: 10,
    unit: "L",
    lotNumber: 2,
    description: "agua",
  });
  _id = response.body._id;

  response = await request(app).delete(`/v1/ingredients/InvalidId/remove`);
  expect(response.statusCode).toBe(500);
});

afterAll((done) => {
  done();
});
