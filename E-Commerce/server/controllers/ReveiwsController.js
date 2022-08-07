import { Auth0Provider } from "@bcwdev/auth0provider";
import { reviewService } from "../services/ReviewService";
import BaseController from "../utils/BaseController";

export class ReviewsController extends BaseController {
  constructor() {
    super ('reviews')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:productId')
      .put('/:reviewId')
      .delete('/:reviewId')
  }

  async createReview (req, res, next) {
    try {
      const userId = req.userInfo.id
      const productId = req.params.productId
      const body = req.body
      const newReview = await reviewService.createReview(userId, productId, body)
      return res.send(newReview)
    } catch (error) {
      next (error)
    }
  }

  async editReview (req, res, next) {
    try {
      const userId = req.userInfo.id
      const reviewId = req.params.reviewId
      const body = req.body
      const updated = await reviewService.editReview(userId, reviewId, body)
      return res.send(updated)
    } catch (error) {
      next (error)
    }
  }

  async deleteReview (req, res, next) {
    try {
      const userId = req.userInfo.id
      const reviewId = req.params.reviewId
      await reviewService.deleteReview(userId, reviewId)
      return res.send('Success')
    } catch (error) {
      next (error)
    }
  }
}