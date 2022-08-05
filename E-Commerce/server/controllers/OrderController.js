import { Auth0Provider } from "@bcwdev/auth0provider";
import { orderService } from "../services/OrderService";
import BaseController from "../utils/BaseController";


export class OrderController extends BaseController {
  constructor() {
    super('orders')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:orderId', this.editOrder)
      .post('/:productId', this.createOrder)
      .delete('/:orderId', this.deleteOrder)
  }

  async editOrder(req, res, next) {
    try {
      const orderId = req.params.orderId
      const userId = req.userInfo.id
      const body = req.body
      const newOrder = await orderService.updateOrder(userId, orderId, body)
      return res.send(newOrder)
    } catch (error) {
      next(error)
    }
  }

  async createOrder(req, res, next) {
    try {
      const userId = req.userInfo.id
      const body = req.body
      const productId = req.params.productId
      const newOrder = await orderService.createOrder(userId, productId, body)
      return res.send(newOrder)
    } catch (error) {
      next(error)
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const userId = req.userInfo.id
      const orderId = req.params.orderId
      const updated = await orderService.deleteOrder(userId, orderId)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
}