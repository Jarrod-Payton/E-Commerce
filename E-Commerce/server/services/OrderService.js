import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { accountService } from "./AccountService"

class OrderService {
  async getOrdersByAccount(userId) {
    await accountService.checkIfAccountExists(userId)
    const orders = await dbContext.Order.find({accountId: userId})
    return orders
  }

}

export const orderService = new OrderService()