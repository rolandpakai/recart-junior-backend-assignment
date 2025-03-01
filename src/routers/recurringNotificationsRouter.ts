/* eslint-disable no-console */
import { Router, Request, Response } from 'express';
import { NotificationResponseSchema, NotificationsRequestBodySchema } from '../schemas/validationSchemas';
import { sendNotification } from '../services/notificationsService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const validatedBody = NotificationsRequestBodySchema.safeParse(req.body);

  if (validatedBody.success) {
    const to = validatedBody.data.to;
    
    const recurringNotifications = ({to}: {to: string}) => {
      const callNotification = async () => {
        const notificationData = await sendNotification({req, to});
        const validationResult = NotificationResponseSchema.safeParse(notificationData);

        if (validationResult.success) {
          console.log(new Date(), validationResult);
        } else {
          const errors = validationResult.error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          }));

          console.log(new Date(), errors);
        }

        setTimeout(callNotification, 60 * 60 * 1000);
      };
    
      callNotification();
    };

    recurringNotifications({to});
    
    res.status(200).json({ status: "ok" });
  } else {
    const errors = validatedBody.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    
    res.status(400).json({ errors });
  }
});

export default router;