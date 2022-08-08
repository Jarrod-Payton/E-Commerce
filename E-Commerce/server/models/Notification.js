import mongoose from "mongoose";
import { notificationTypeEnum } from "../enums/NotificationTypeEnum";

const Schema = mongoose.Schema

export const NotificationSchema = new Schema (
  {
    accountId: {type: Object},
    viewed: {type: Boolean},
    type: {type: String, enum: [notificationTypeEnum.orderUpdate, notificationTypeEnum.newSale, notificationTypeEnum.reviewPlaced, notificationTypeEnum.newProduct, notificationTypeEnum.discountUsed], required: true},
    message: {type: String, required: true},
    deleted: {type: Boolean, required: true},
    linkedId: {type: Object}
  },
  { timestamps: true, toJSON: { virtuals: true }}
)
NotificationSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})