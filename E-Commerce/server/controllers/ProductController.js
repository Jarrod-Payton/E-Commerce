import { Auth0Provider } from "@bcwdev/auth0provider";
import { productService } from "../services/ProductService";
import BaseController from "../utils/BaseController";

export class ProductController extends BaseController {
  constructor() {
    super('products')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllProducts)
      .get('/:productId', this.getProductById)
      .get('/:productId/reviews', this.getReviewsByProductId)
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

  async getReviewsByProductId(req, res, next) {
    try {
      const reviews = await
      return res.send(reviews)
    } catch (error) {
      next(error)
    }
  }
}