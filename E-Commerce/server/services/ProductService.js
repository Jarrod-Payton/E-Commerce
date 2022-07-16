import { dbContext } from "../db/DbContext"

class ProductService {
  async getAllProducts(query = {}) {
    const res = await dbContext.Account.find(query)
    return res
  }
}

export const productService = new ProductService()