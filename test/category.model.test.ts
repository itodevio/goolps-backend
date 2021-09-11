import { connect, Connection, connection, models } from "mongoose";
import ProductCategoryModel from "../src/routes/v1/Category/model";
import request from 'supertest';
import express from 'express';
import { app } from "../app";

const dbtype = process.env.dbtype ? "mongo" : "localhost";

let conn:any;

beforeAll(async () => {
  conn = await connect("mongodb://localhost:27017/testCategory");
});

test("POST /category response code", async () =>{
  const response = await request(app).post("/v1/category").send({
    name: "Vegetais"
  })
  expect(response.statusCode).toBe(200)
});

test("POST /category response content", async () =>{
  const response = await request(app).post("/v1/category").send({
    name: "Vegetais"
  })
  expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
});

test("POST /category response no content", async () =>{
  const response = await request(app).post("/v1/category").send({
  })
  expect(response.statusCode).toBe(400)
});

afterAll(async () => {
  try {
    await connection.close();
  } catch (err) {
    console.log(err);
  }
});


