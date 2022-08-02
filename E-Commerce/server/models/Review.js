import mongoose from "mongoose";

const Schema = mongoose.Schema

export const ReviewSchema = new Schema(
  {
    productId: {type: Object, required: true},
    accountId: {type: Object, required: true},
    rating: {type: Number, min: 0.5, max: 10, required: true},
    text: {type: String},
    edited: {type: Boolean, required: true}
  },
  { timestamps: true, toJSON: { virtuals: true }}
)
ReviewSchema.virtual('product', {
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
  ref: 'Product'
})
ReviewSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})