import mongoose from "mongoose";
import { ReviewSchema } from "./Review";

const Schema = mongoose.Schema

export const OrderSchema = new Schema (
  {
    productId: {type: Object, required: true},
    accountId: {type: Object, required: true},
    deliveryAddress: {type: String, required: true},
    deliveryStatus: {type: String, enum: ['Not Shipped', 'Shipped', 'Out for Delivery', 'Delivered']},
    received: {type: Boolean, required: true}
  },
  { timestamps: true, toJSON: { virtuals: true }}
)
ReviewSchema.virtual('product', {
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
  ref: 'Product',
})
ReviewSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})