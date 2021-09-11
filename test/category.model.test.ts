import { connect, Connection, connection, models } from "mongoose";
import ProductCategoryModel from "../src/routes/v1/Category/model";

const dbtype = process.env.dbtype ? "mongo" : "localhost";

let conn:any;

beforeAll(async () => {
  conn = await connect("mongodb://localhost:27017/testUser");
  console.log(conn);
});

describe("Category Model", () => {
  it("has name attributes", () => {
    let expectedKeys = ["name"];
    let keys = Object.keys(ProductCategoryModel.schema.paths);
    let categoryAttributes = [keys[0]];
    expect(categoryAttributes).toStrictEqual(expectedKeys);
  });
});

it("should create a new category", async () => {
  try {
    const Category = new ProductCategoryModel({
      name: "Vegetais",
    });
    console.log(Category);
    let result = await Category.save();
    console.log(result);
    expect(result.name).toEqual(Category.name);
  } catch (err) {
  }
});

afterAll(async () => {
  try {
    await connection.close();
  } catch (err) {
    console.log(err);
  }
});


