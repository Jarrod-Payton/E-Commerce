import mongoose from "mongoose";

const Schema = mongoose.Schema

export const ProductSchema = new Schema (
  {
    name: {type: String, required: true},
    headline: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: Array, required: true},
    quantity: {type: Number, required: true, min: 0},
    price: {type: Number, required: true, min: 0},
    img: {type: String, default: 'https://thiscatdoesnotexist.com'},
    creatorId: {type: Object}
  },
  { timestamps: true, toJSON: { virtuals: true }}
)
ProductSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})