import { Auth0Provider } from "@bcwdev/auth0provider";
import { followerService } from "../services/FollowerService";
import BaseController from "../utils/BaseController";


export class FollowerController extends BaseController {
  constructor() {
    super('follower')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/following')
      .get('/followers')
      .get('/:accountId/followers')
      .get('/:accountId/following')
      .post('/:followingId')
      .delete('/:followingId')
  }

  async getThePeopleIFollow(req, res, next) {
    try {
      const userId = req.userInfo.id
      const followers = await followerService.getAccountFollows(userId)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }

  async getMyFollowers(req, res, next) {
    try {
      const userId = req.userInfo.id
      const followers = await followerService.getFollowersByAccount(userId)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }

  async getSomeoneElsesFollowing(req, res, next) {
    try {
      const accountId = req.params.accountId
      const followers = await followerService.getAccountFollows(accountId)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }

  async getSomeoneElsesFollowers(req, res, next) {
    try {
      const accountId = req.params.accountId
      const followers = await followerService.getFollowersByAccount(accountId)
      return res.send(followers)
    } catch (error) {
      next(error)
    }
  }

  async followSomeone(req, res, next) {
    try {
      const userId = req.userInfo.id
      const accountId = req.params.accountId
      const follow = await followerService.followSomeone(userId, accountId)
      return res.send(follow)
    } catch (error) {
      next(error)
    }
  }

  async unfollow(req, res, next) {
    try {
      const userId = req.userInfo.id
      const accountId = req.params.accountId
      await followerService.unfollow(userId, accountId)
      return res.send('Success')
    } catch (error) {
      next(error)
    }
  }
}