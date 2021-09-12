import request from "supertest";
import { app } from "../app";

let _id;
//GET
test("GET /orders response code", async () => {
  const response = await request(app).get("/v1/orders");
  expect(response.statusCode).toBe(200);
});

test("GET /orders response content", async () => {
  const response = await request(app).get("/v1/orders");
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

//POST

test("POST /orders success existing category", async () => {
  const response = await request(app).post("/v1/orders").send({
    products: ["613e2d69de9973216615c96c"],
    note: "nada",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "master",
    totalPrice: 150,
  });
  expect(response.statusCode).toBe(200);
  let products = response.body.products;
  let note = response.body.note;
  let tableNumber = response.body.tableNumber;
  let paymentType = response.body.paymentType;
  let cardBrand = response.body.cardBrand;
  let totalPrice = response.body.totalPrice;
  expect(products).toStrictEqual(["613e2d69de9973216615c96c"]);
  expect(note).toBe("nada");
  expect(tableNumber).toBe(1);
  expect(paymentType).toBe("card");
  expect(cardBrand).toBe("master");
  expect(totalPrice).toBe(150);
});

test("POST /orders response no products", async () => {
  const response = await request(app).post("/v1/orders").send({
    note: "nada",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "master",
    totalPrice: 150,
  });
  expect(response.statusCode).toBe(400);
});

//PUT

test("PUT /orders success", async () => {
  let response = await request(app).post("/v1/orders").send({
    products: ["613e2d69de9973216615c96c"],
    note: "nada",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "master",
    totalPrice: 150,
  });
  _id = response.body._id;
  console.log(_id);

  response = await request(app).put(`/v1/orders/${_id}/update`).send({
    products: ["613e2dca4f8961cfce157045"],
    note: "assado",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "visa",
    totalPrice: 110,
  });
  expect(response.statusCode).toBe(200);
  let products = response.body.products;
  let note = response.body.note;
  let tableNumber = response.body.tableNumber;
  let paymentType = response.body.paymentType;
  let cardBrand = response.body.cardBrand;
  let totalPrice = response.body.totalPrice;
  expect(products).toStrictEqual(["613e2dca4f8961cfce157045"]);
  expect(note).toBe("assado");
  expect(tableNumber).toBe(1);
  expect(paymentType).toBe("card");
  expect(cardBrand).toBe("visa");
  expect(totalPrice).toBe(110);
});

test("PUT /orders response invalid id", async () => {
  const response = await request(app).put(`/v1/orders/InvalidId/update`).send({
    products: ["613e2dca4f8961cfce157045"],
    note: "assado",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "visa",
    totalPrice: 110,
  });
  expect(response.statusCode).toBe(500);
});

test("PUT /orders response no fields to update", async () => {
  let response = await request(app).post("/v1/orders").send({
    products: ["613e2dca4f8961cfce157045"],
    note: "assado",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "visa",
    totalPrice: 110,
  });
  _id = response.body._id;

  response = await request(app).put(`/v1/orders/${_id}/update`).send({});
  expect(response.statusCode).toBe(400);
});

// //DELETE

test("DELETE /orders success", async () => {
  let response = await request(app).post("/v1/orders").send({
    products: ["613e2dca4f8961cfce157045"],
    note: "assado",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "visa",
    totalPrice: 110,
  });
  _id = response.body._id;

  response = await request(app).delete(`/v1/orders/${_id}/remove`);
  expect(response.statusCode).toBe(200);
});

test("DELETE /orders response invalid id", async () => {
  let response = await request(app).post("/v1/orders").send({
    products: ["613e2dca4f8961cfce157045"],
    note: "assado",
    tableNumber: 1,
    paymentType: "card",
    cardBrand: "visa",
    totalPrice: 110,
  });
  _id = response.body._id;

  response = await request(app).delete(`/v1/orders/InvalidId/remove`);
  expect(response.statusCode).toBe(500);
});

afterAll((done) => {
  done();
});
