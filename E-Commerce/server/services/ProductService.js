import { dbContext } from "../db/DbContext"
import { notificationTypeEnum } from "../enums/NotificationTypeEnum"
import { BadRequest, Forbidden } from '../utils/Errors'
import { followerService} from './FollowerService'
import { notificationService } from "./NotificationService"

class ProductService {
  async getAllProducts(query = {}) {
    const res = await dbContext.Product.find(query)
    return res
  }

  async getProductById(id) {
    const found = await dbContext.Product.findById(id)
    if (!found) {
      throw new BadRequest('Incorrect Id')
    }
    return found
  }

  async createProduct(body, userId) {
    body.creatorId = userId
    const res = await dbContext.Product.create(body)
    const followers = await followerService.getFollowersByAccount(userId)
    let notifications = []
    followers.forEach(follower => {
      let notification = {
        accountId: follower.accountId,
        type: notificationTypeEnum.newProduct,
        message: `${follower.followed.name} has put up a new product "${body.name}" check it out!`,
        linkedId: res.id
      }
      notifications.push(notification)
    })
    await notificationService.createNotifications(notifications)
    return res
  }

  async editProduct(body, userId) {
    const found = await dbContext.Product.findById(body.id)
    if (!found) {
      throw new BadRequest('No Product with that Id')
    }
    if (found.creatorId !== userId) {
      throw new Forbidden('You are not the creator of this product')
    }
    await dbContext.Product.findOneAndUpdate(body.id, body)
    const updated = await dbContext.Product.findById(body.id)
    return updated
  }

  async deleteProduct(id, userId) {
    const found = await dbContext.Product.findById(id)
    if (!found) {
      throw new BadRequest('No Product with that Id')
    }
    if (found.creatorId !== userId) {
      throw new Forbidden('You are not the creator of this product')
    }
    await dbContext.Product.findByIdAndDelete(id)
  }
}

export const productService = new ProductService()