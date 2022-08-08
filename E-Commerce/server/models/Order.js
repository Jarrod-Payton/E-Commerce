import mongoose from "mongoose";
import { deliveryStatus } from "../enums/DeliveryStatusEnum";
import { ReviewSchema } from "./Review";

const Schema = mongoose.Schema

export const OrderSchema = new Schema (
  {
    productId: {type: Object, required: true},
    accountId: {type: Object, required: true},
    deliveryAddress: {type: String, required: true},
    deliveryStatus: {type: String, enum: [deliveryStatus.notShipped, deliveryStatus.shipped, deliveryStatus.outForDelivery, deliveryStatus.delivered, deliveryStatus.cancelled]},
    quantity: {type: Number, default: 1},
    received: {type: Boolean, required: true},
    product: {type: Object, required: true}
  },
  { timestamps: true, toJSON: { virtuals: true }}
)
ReviewSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})