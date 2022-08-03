import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { accountService } from "./AccountService"

class OrderService {
  async getOrdersByAccount(userId) {
    await accountService.checkIfAccountExists(userId)
    const orders = await dbContext.Order.find({accountId: userId})
    return orders
  }

  async getAmountOfProductSold(productId) {
    const orders = await dbContext.Order.find({productId: productId})
    let quantity = 0
    orders.forEach(order => {
      delete order.accountId
      delete order.deliveryAddress
      delete order.deliveryStatus
      delete order.received
      delete order.account
    })
    return orders
  }

}

export const orderService = new OrderService()