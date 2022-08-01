import { Auth0Provider } from "@bcwdev/auth0provider";
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
      if (!foundProduct) {
        throw new BadRequest('No Product Found')
      }
      const reviews = await reviewService.getReviewsByProductId(req.body)
      return res.send(reviews)
    } catch (error) {
      next(error)
    }
  }
}