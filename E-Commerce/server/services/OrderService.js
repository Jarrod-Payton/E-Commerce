import { dbContext } from "../db/DbContext"
import { deliveryStatus } from "../enums/DeliveryStatusEnum"
import { notificationTypeEnum } from "../enums/NotificationTypeEnum"
import { BadRequest, Forbidden } from "../utils/Errors"
import { accountService } from "./AccountService"
import { notificationService } from "./NotificationService"
import { productService } from "./ProductService"

class OrderService {

  async getOrderByAccountAndProduct(accountId, productId) {
    const found = await dbContext.Order.findOne({accountId: accountId, productId: productId})
    return found
  }
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
    body.deliveryStatus = deliveryStatus.notShipped
    product.quantity--
    let existingOrder = await dbContext.Order.findOne({accountId: userId, productId: productId})
    if (existingOrder) {
      throw new BadRequest('Order already exists')
    }
    const newOrder = await dbContext.Order.create(body)
    const notifications = [{
      accountId: product.creatorId,
      type: notificationTypeEnum.newSale,
      message: `You sold ${body.quantity} ${product.name}`,
      linkedId: productId
    },
    {
      accountId: userId,
      type: notificationTypeEnum.orderUpdate,
      message: `Confirmed your order for ${body.quantity} ${product.name}`,
      linkedId: newOrder.id
    }]
    await notificationService.createNotifications(notifications)
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
    const notifications = [{
      accountId: existingOrder.accountId,
      type: notificationTypeEnum.orderUpdate,
      message: `Your order has been updated`,
      linkedId: updated.id
    }]
    await notificationService.createNotifications(notifications)
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
    const updated = await orderService.updateOrder(userId, orderId, existingOrder)
    const notifications = [{
      accountId: existingOrder.accountId,
      type: notificationTypeEnum.orderUpdate,
      message: `Your order has been cancelled`,
      linkedId: updated.id
    }]
    await notificationService.createNotifications(notifications)
    return updated
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