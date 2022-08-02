import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { accountService } from "./AccountService"

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
}

export const reviewService = new ReviewService()