import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { accountService } from "./AccountService"

class FollowerService {
  async unfollow(userId, accountId) {
    const follow = await followerService.getFollow(userId, accountId)
    if (!follow) {
      throw new BadRequest('You are already not followed')
    }
    await dbContext.Follow.findByIdAndDelete(follow._id)
  }

  async getFollow(accountId, followingId) {
    const follow = await dbContext.Follow.findOne({accountId: accountId, followingId: followingId})
    if (!follow) {
      throw new BadRequest('No Follow In Place')
    }
    return follow
  }

  async followSomeone(userId, accountId) {
    const accounToBeFollowed = await accountService.checkIfAccountExists(accountId)
    if (!accounToBeFollowed) {
      throw new BadRequest('No Account with that Id')
    }
    const existingFollow = await followerService.getFollow(userId, accountId)
    if (existingFollow) {
      throw new BadRequest('You are already following them')
    }
    let body = {}
    body.accountId = userId
    body.followingId = accountId
    body.type = 'Person'
    const follow = dbContext.Follow.create(body)
    return follow
  }

  async getFollowersByAccount(userId) {
    await accountService.checkIfAccountExists(userId)
    const followers = await dbContext.Follow.find({followingId: userId})
    return followers
  }

  async getAccountFollows(userId) {
    await accountService.checkIfAccountExists(userId)
    const following = await dbContext.Follow.find({accountId: userId})
    return following
  }

}

export const followerService = new FollowerService()