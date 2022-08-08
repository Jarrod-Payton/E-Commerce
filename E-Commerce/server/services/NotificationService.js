import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class NotificationService {
  async getAllNotificationsByAccountId(accountId) {
    const found = await dbContext.Notification.find({accountId: accountId})
    await this.checkNotifications(accountId)
    return found
  }

  async findSpecificNotification(notificationId) {
    const found = await dbContext.Notification.findById(notificationId)
    if (!found) {
      throw new BadRequest('No Notification with that Id')
    }
    return found
  }

  async allNotificationsSeen(accountId) {
    await dbContext.Notification.updateMany({accountId: accountId, deleted: false}, {viewed: true})
    const updated = await this.getAllNotificationsByAccountId(accountId)
    return updated
  }
  async createNotifications(notifications) {
    await notifications.forEach(notification => {
      notification.viewed = false
      notification.deleted = false
      dbContext.Notification.create(notification)
    })
  }

  async viewedNotification(notificationId, accountId) {
    const found = await this.findSpecificNotification(notificationId)
    if (found.accountId !== accountId) {
      throw new Forbidden(`This isn't your notificiation`)
    }
    await dbContext.Notification.findByIdAndUpdate(notificationId, {viewed: true})
  }

  async deleteNotification(notificationId, accountId) {
    const notification = await dbContext.Notification.findById(notificationId)
    if (!notification) {
      throw new BadRequest('No Notification with that Id')
    }
    if (notification.accountId !== accountId) {
      throw new Forbidden(`You aren't the owner of this notification`)
    }
    await dbContext.Notification.findByIdAndDelete(notificationId)
  }


  async checkNotifications(accountId) {
    const found = await this.getAllNotificationsByAccountId(accountId)
    found.forEach(notification => {
      if (notification.deleted === true) {
      // TODO
      }
    })
  }
}

export const notificationService = new NotificationService()