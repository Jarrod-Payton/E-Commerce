import mongoose from "mongoose";

const Schema = mongoose.Schema

export const FollowSchema = new Schema(
  {
    accountId: {type: Object, required: true},
    followingId: {type: Object},
    type: {type: String, enum: ['Product', 'Person']}
  },
  { timestamps: true, toJSON: { virtuals: true }}
)
FollowSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
FollowSchema.virtual('followed', {
  localField: 'followingId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})