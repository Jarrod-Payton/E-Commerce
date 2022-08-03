import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from '../utils/Errors'

class ProductService {
  async getAllProducts(query = {}) {
    const res = await dbContext.Account.find(query)
    return res
  }

  async getProductById(id) {
    const found = await dbContext.Product.findById(id)
    if (!found) {
      throw new BadRequest('Incorrect Id')
    }
    return found
  }

  async createProduct(body, userId) {
    body.creatorId = userId
    const res = await dbContext.Product.create(body)
    return res
  }

  async editProduct(body, userId) {
    const found = await dbContext.Product.findById(body.id)
    if (!found) {
      throw new BadRequest('No Product with that Id')
    }
    if (found.creatorId !== userId) {
      throw new Forbidden('You are not the creator of this product')
    }
    await dbContext.Product.findOneAndUpdate(body.id, body)
    const updated = await dbContext.Product.findById(body.id)
    return updated
  }

  async deleteProduct(id, userId) {
    const found = await dbContext.Product.findById(id)
    if (!found) {
      throw new BadRequest('No Product with that Id')
    }
    if (found.creatorId !== userId) {
      throw new Forbidden('You are not the creator of this product')
    }
    await dbContext.Product.findByIdAndDelete(id)
  }
}

export const productService = new ProductService()