import { Auth0Provider } from "@bcwdev/auth0provider";
import { discountService } from "../services/DiscountService";
import { orderService } from "../services/OrderService";
import { productService } from "../services/ProductService";
import { reviewService } from "../services/ReviewService";
import BaseController from "../utils/BaseController";
import { BadRequest } from "../utils/Errors";

export class ProductController extends BaseController {
  constructor() {
    super('products')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllProducts)
      .get('/:productId', this.getProductById)
      .get('/:productId/reviews', this.getProductsReviews)
      .get('/:productId/sold', this.productsSold)
      .get('/:productId/:discountCode', this.checkDiscountCode)
      .put('/:productId', this.editProduct)
      .post('', this.createProduct)
      .delete('/:productId', this.deleteProduct)
  }

  async getAllProducts(req, res, next) {
    try {
      const query = req.body
      const products = await productService.getAllProducts(query)
      return res.send(products)
    } catch (error) {
      next(error)
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.productId);
      return res.send(product)
    } catch (error) {
      next (error)
    }
  }

  async getProductsReviews(req, res, next) {
    try {
      req.body.productId = req.params.productId
      const foundProduct = await productService.getProductById(req.params.productId)
      const reviews = await reviewService.getReviewsByProductId(req.body)
      return res.send(reviews)
    } catch (error) {
      next(error)
    }
  }

  async productsSold(req, res, next) {
    try {
      const amountSold = await orderService.getAmountOfProductSold(req.params.productId)
      return res.send(amountSold)
    } catch (error) {
      next(error)
    }
  }

  async checkDiscountCode(req, res, next) {
    try {
      const newPrice = await discountService.checkCouponCode(req.params.productId, req.params.discountCode)
      return res.send(newPrice)
    } catch (error) {
      next(error)
    }
  }

  async editProduct(req, res, next) {
    try {
      const userId = req.userInfo.id
      const body = req.body
      const newProduct = await productService.editProduct(body, userId)
      return res.send(newProduct)
    } catch (error) {
      next(error)
    }
  }

  async createProduct(req, res, next) {
    try {
      const userId = req.userInfo.id
      const body = req.body
      const newProduct = await productService.createProduct(body, userId)
      return res.send(newProduct)
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const userId = req.userInfo.id
      await productService.deleteProduct(req.params.productId, userId)
      return res.send('Success')
    } catch (error) {
      next(error)
    }
  }
}