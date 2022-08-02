import mongoose from "mongoose";

const Schema = mongoose.Schema

export const NotificationSchema = new Schema (
  {
    accountId: {type: Object},
    viewed: {type: Boolean},
    type: {type: String, enum: ['Order Update', 'New Sale', 'Review Placed', 'New Product', 'Discount Used'], required: true},
    message: {type: String, required: true},
    deleted: {type: Boolean, required: true}
  },
  { timestamps: true, toJSON: { virtuals: true }}
)
NotificationSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})