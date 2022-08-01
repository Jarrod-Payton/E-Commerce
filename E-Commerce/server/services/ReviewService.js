import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ReviewService {
  async getReviewsByProductId(body) {
    const reviews = await dbContext.Review.find(body)
    return reviews
  }
}

export const reviewService = new ReviewService()