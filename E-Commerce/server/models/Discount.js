import mongoose from "mongoose";

const Schema = mongoose.Schema

export const DiscountSchema = new Schema(
  {
    code: {type: String, required: true},
    productId: {type: Object, required: true},
    newPrice: {type: Number, required: true}
  },
  {timestamps: true, toJSON: {virtuals: true}}
)
DiscountSchema.virtual('product', {
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
  ref: 'Product'
})