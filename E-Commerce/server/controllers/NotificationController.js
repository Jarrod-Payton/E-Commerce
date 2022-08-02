import { Auth0Provider } from "@bcwdev/auth0provider";
import { notificationService } from "../services/NotificationService";
import BaseController from "../utils/BaseController";

export class NotificationController extends BaseController {
  constructor() {
    super('notifications')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllAccountNotifications)
      .put('', this.setAllNotificationsAsViewed)
      .put('/:notificationId', this.viewedNotification)
      .delete('/:notificationId', this.deleteNotification)
  }

  async getAllAccountNotifications(req, res, next) {
    try {
      const userId = req.userInfo.id
      const notifications = await notificationService.getAllNotificationsByAccountId(userId)
      return res.send(notifications)
    } catch (error) {
      next(error)
    }
  }

  async setAllNotificationsAsViewed(req, res, next) {
    try {
      const userId = req.userInfo.id
      const notifications = await notificationService.allNotificationsSeen(userId)
      return res.send(notifications)
    } catch (error) {
      next (error)
    }
  }

  async viewedNotification(req, res, next) {
    try {
      const userId = req.userInfo.id
      await notificationService.viewedNotification(req.params.notificationId, userId)
      return res.send('Success')
    } catch (error) {
      next(error)
    }
  }

  async deleteNotification (req, res, next) {
    try {
      const userId = req.userInfo.id
      await notificationService.deleteNotification(req.params.notificationId, userId)
      return res.send('Success')
    } catch (error) {
      next(error)
    }
  }
}