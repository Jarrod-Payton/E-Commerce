import { Auth0Provider } from "@bcwdev/auth0provider";
import { productService } from "../services/ProductService";
import BaseController from "../utils/BaseController";

export class ProductController extends BaseController {
  constructor() {
    super('product')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllProducts)
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
}