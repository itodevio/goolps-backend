import { Document, Schema, model } from "mongoose";
import { Order } from "./interface";

const OrderSchema = new Schema<Order>({
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  note: String,
  tableNumber: Number,
  paymentType: String,
  cardBrand: String,
  totalPrice: Number,
  changeFor: Number,
});

const OrderModel = model<Order>("Order", OrderSchema);

export default OrderModel;
