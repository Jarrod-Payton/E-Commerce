import { dbContext } from "../db/DbContext"

class DiscountService {
  async checkCouponCode(productId, discountCode) {
    let price = 0
    const discount = await dbContext.Discount.findOne({code: discountCode})
    const product = await dbContext.Product.findById(productId)
    if (discount) {
      price = discount.newPrice
    } else {
      price = product.price
    }
    return price
  }

}

export const discountService = new DiscountService()