import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from "../db/DbContext"
import { accountService } from '../services/AccountService'
import { followerService } from "../services/FollowerService"
import { orderService } from "../services/OrderService"
import { reviewService } from "../services/ReviewService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:accountId', this.getPublicAccount)
      .get('/:accountId/reviews', this.getAccountReviews)
      .get('/:accountId/orders', this.getOrdersByAccount)
      .get('/:accountId/followers', this.getFollowersByAccount)
      .get('/:accountId/follows', this.getFollowsByAccount)
      .put('', this.editAccount)
      .delete('', this.deleteAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getPublicAccount(req, res, next) {
    try {
      const account = await accountService.getOtherAccount(req.params.accountId)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountReviews(req, res, next) {
    try {
      const userId = req.userInfo.id
      const reviews = reviewService.getReviewsByAccountid(userId)
      return res.send(reviews)
    } catch (error) {
      next(error)
    }
  }

  async getOrdersByAccount(req, res, next) {
    try {
      const userId = req.userInfo.id
      const orders = await orderService.getOrdersByAccount(userId)
      return res.send(orders)
    } catch (error) {
      next(error)
    }
  }

  async getFollowersByAccount(req, res, next) {
    try {
      const userId = req.userInfo.id
      const followers = await followerService.getFollowersByAccount(userId)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }
  
  async getFollowsByAccount(req, res, next) {
    try {
      const userId = req.userInfo.id
      const following = await followerService.getAccountFollows(userId)
      return res.send(following)
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      const user = req.userInfo
      const updatedAccount = await accountService.updateAccount(user, req.body)
      return res.send(updatedAccount)
    } catch (error) {
      next(error)
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const userId = req.userInfo.id
      await accountService.deleteAccount(userId)
      return res.send('Success')
    } catch (error) {
      next (error)
    }
  }
}
