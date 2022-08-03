import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { DiscountSchema } from "../models/Discount";
import { FollowSchema } from "../models/Follow";
import { NotificationSchema } from "../models/Notification";
import { OrderSchema } from "../models/Order";
import { ProductSchema } from "../models/Product";
import { ReviewSchema } from "../models/Review";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Product = mongoose.model('Product', ProductSchema)
  Review = mongoose.model('Review', ReviewSchema)
  Order = mongoose.model('Order', OrderSchema)
  Notification = mongoose.model('Notification', NotificationSchema)
  Follow = mongoose.model('Follow', FollowSchema)
  Discount = mongoose.model('Discount', DiscountSchema)
}

export const dbContext = new DbContext()
