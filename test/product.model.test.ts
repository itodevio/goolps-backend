import request from "supertest";
import { app } from "../app";

let _id;
//GET
test("GET /products response code", async () => {
  const response = await request(app).get("/v1/products");
  expect(response.statusCode).toBe(200);
});

test("GET /products response content", async () => {
  const response = await request(app).get("/v1/products");
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

//POST

test("POST /products success existing category", async () => {
  const response = await request(app).post("/v1/products").send({
    _id: "613e613e6d4c50535f945798",
    name: "Cebola Frita",
    price: 10,
    category: "Vegetais",
    ingredients: ["613e61e6374b4600a3988647"],
    description: "cebola frita no oleo",
  });
  expect(response.statusCode).toBe(200);
  let name = response.body.name;
  let price = response.body.price;
  let category = response.body.category;
  let ingredients = response.body.ingredients;
  let description = response.body.description;
  expect(name).toBe("Cebola Frita");
  expect(price).toBe(10);
  expect(category).toBe("613e613e6d4c50535f945798");
  expect(ingredients).toStrictEqual(["613e61e6374b4600a3988647"]);
  expect(description).toBe("cebola frita no oleo");
});

test("POST /products success non existent category", async () => {
  const response = await request(app).post("/v1/products").send({
    _id:"613e626bae22c9188eb37124",
    name: "Suco de laranja",
    price: 10,
    category: "Bebidas",
    ingredients: ["613e298d6ead7f90d19d7409"],
    description: "suquinho de laranja",
  });
  expect(response.statusCode).toBe(200);
  let name = response.body.name;
  let price = response.body.price;
  let category = response.body.category;
  let ingredients = response.body.ingredients;
  let description = response.body.description;
  expect(name).toBe("Suco de laranja");
  expect(price).toBe(10);
  expect(ingredients).toStrictEqual(["613e298d6ead7f90d19d7409"]);
  expect(description).toBe("suquinho de laranja");
});

test("POST /products missing field other than name", async () => {
  const response = await request(app).post("/v1/products").send({
    _id:"613e626bae22c9188eb37129",
    name: "Bife",
    category: "Carne",
    ingredients: ["613e61e6374b4600a3988649"],
    description: "bife",
  });
  expect(response.statusCode).toBe(200);
});


test("POST /products response no name", async () => {
  const response = await request(app).post("/v1/products").send({
    price: 10,
    category: "Vegetais",
    ingredients: ["613e61e6374b4600a3988649"],
    description: "bife",
  });
  expect(response.statusCode).toBe(400);
});

//PUT

test("PUT /products success", async () => {
  const response = await request(app).put(`/v1/products/613e613e6d4c50535f945798/update`).send({
    name: "Cebola Frita",
    price: 15,
  });
  expect(response.statusCode).toBe(200);
  let name = response.body.name;
  let price = response.body.price;
  let category = response.body.category;
  let ingredients = response.body.ingredients;
  let description = response.body.description;
  expect(name).toBe("Cebola Frita");
  expect(price).toBe(15);
  expect(category).toBe("613e613e6d4c50535f945798");
  expect(ingredients).toStrictEqual(["613e61e6374b4600a3988647"]);
  expect(description).toBe("cebola frita no oleo");
});

test("PUT /products response invalid id", async () => {
  const response = await request(app).put(`/v1/products/InvalidId/update`).send({
    name: "File",
    price: 15,
    category: "Carne",
    ingredients: ["613e28bbcb119a9840816a17"],
    description: "bife",
  });
  expect(response.statusCode).toBe(500);
});

test("PUT /products response no fields to update", async () => {
  const response = await request(app).put(`/v1/products/613e613e6d4c50535f945798}/update`).send({});
  expect(response.statusCode).toBe(400);
});

// //DELETE

test("DELETE /products success", async () => {
  let response = await request(app).post("/v1/products").send({
    name: "File",
    price: 15,
    category: "Carne",
    ingredients: ["613e28bbcb119a9840816a17"],
    description: "bife",
  });
  _id = response.body._id;

  response = await request(app).delete(`/v1/products/${_id}/remove`);
  expect(response.statusCode).toBe(200);
});

test("DELETE /products response invalid id", async () => {
  const response = await request(app).delete(`/v1/products/InvalidId/remove`);
  expect(response.statusCode).toBe(500);
});

afterAll((done) => {
  done();
});
