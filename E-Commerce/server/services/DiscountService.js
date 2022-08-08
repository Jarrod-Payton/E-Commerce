import { dbContext } from "../db/DbContext"
import { notificationTypeEnum } from "../enums/NotificationTypeEnum"
import { BadRequest } from "../utils/Errors"

class DiscountService {
  async checkCouponCode(productId, discountCode) {
    const discount = await dbContext.Discount.findOne({code: discountCode, productId: productId})
    if (!discount || discount.quantity <= 0) {
      throw new BadRequest('No Discount Code')
    }
    return discount
  }
}

export const discountService = new DiscountService()