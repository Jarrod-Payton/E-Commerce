import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
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
}

export const dbContext = new DbContext()
