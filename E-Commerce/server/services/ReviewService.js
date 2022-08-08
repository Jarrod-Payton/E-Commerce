import { dbContext } from "../db/DbContext"
import { notificationTypeEnum } from "../enums/NotificationTypeEnum"
import { BadRequest, Forbidden } from "../utils/Errors"
import { accountService } from "./AccountService"
import { notificationService } from "./NotificationService"
import { orderService } from "./OrderService"
import { productService } from "./ProductService"

class ReviewService {
  async getReviewsByProductId(body) {
    const reviews = await dbContext.Review.find(body)
    return reviews
  }

  async getReviewsByAccountid(accountId) {
    await accountService.checkIfAccountExists(accountId)
    const reviews = await dbContext.Review.find({accountId: accountId})
    return reviews
  }

  async getReviewById(reviewId) {
    const found = await dbContext.Review.findById(reviewId)
    if (!found) {
      throw new BadRequest('No Review with that Id')
    }
    return found
  }

  async createReview(userId, productId, body) {
    body.accountId = userId
    body.edited = false
    const product = await productService.getProductById(productId)
    const order = await orderService.getOrderByAccountAndProduct(userId, productId)
    if (order) {
      body.purchased = true
    } else {
      body.purchased = false
    }
    const newReview = await dbContext.Review.create(body)
    const notifications = [{
      accountId: product.creatorId,
      type: notificationTypeEnum.reviewPlaced,
      message: `A new review has been placed on ${product.name}`,
      linkedId: newReview.id
    }]
    await notificationService.createNotifications(notifications)
    return newReview
  }

  async editReview(userId, reviewId, body) {
    const previous = await reviewService.getReviewById(reviewId)
    if (previous.accountId !== userId) {
      throw new Forbidden('Not your review')
    }
    body.edited = true
    body.purchased = previous.purchased
    await dbContext.Review.findByIdAndUpdate(reviewId, body)
    const updated = await reviewService.getReviewById(reviewId)
    return updated
  }
  async deleteReview(userId, reviewId) {
    const review = await reviewService.getReviewById(reviewId)
    if (review.accountId !== userId) {
      throw new Forbidden('Not your review')
    }
    await dbContext.Review.findByIdAndDelete(reviewId)
  }

}

export const reviewService = new ReviewService()