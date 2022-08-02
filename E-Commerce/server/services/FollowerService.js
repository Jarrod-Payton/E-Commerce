import { dbContext } from "../db/DbContext"
import { accountService } from "./AccountService"

class FollowerService {
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