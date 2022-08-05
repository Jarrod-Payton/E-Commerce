import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { accountService } from "./AccountService"
import { productService } from "./ProductService"

class OrderService {
  async getOrdersByAccount(userId) {
    await accountService.checkIfAccountExists(userId)
    const orders = await dbContext.Order.find({accountId: userId})
    return orders
  }

  async getOrderById(orderId) {
    const order = await dbContext.Order.findById(orderId)
    if (!order) {
      throw new BadRequest('No Order with that Id')
    }
    return order
  }

  async createOrder(userId, productId, body) {
    let product = await productService.getProductById(productId)
    if (!product) {
      throw new BadRequest('No Product Exists with that Id')
    }
    body.productId = productId
    body.accountId = userId
    body.product = product
    product.quantity--
    let existingOrder = await dbContext.Order.findOne({accountId: userId, productId: productId})
    if (existingOrder) {
      throw new BadRequest('Order already exists')
    }
    const newOrder = await dbContext.Order.create(body)
    return newOrder
  }

  async updateOrder(userId, orderId, body) {
    const existingOrder = await orderService.getOrderById(orderId)
    if (existingOrder.accountId !== userId) {
      throw new Forbidden('Not your Order')
    }
    body.productId = existingOrder.productId
    body.accountId = existingOrder.accountId
    body.product = existingOrder.product
    await dbContext.Order.findByIdAndUpdate(orderId, body)
    const updated = await dbContext.Order.findById(orderId)
    return updated
  }

  async deleteOrder(userId, orderId) {
    let existingOrder = await orderService.getOrderById(orderId)
    if (existingOrder.accountId !== userId) {
      throw new Forbidden('Not your order')
    }
    if (existingOrder.deliveryStatus === 'Delivered' || existingOrder.deliveryStatus === 'Out for Delivery' || existingOrder.received) {
      throw new Forbidden('Too late amigo')
    }
    existingOrder.deliveryStatus = 'Cancelled'
    return orderService.updateOrder(userId, orderId, existingOrder)
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