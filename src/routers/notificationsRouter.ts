import { Router, Request, Response } from 'express';
import { sendEmail } from '../services/emailService';
import { NotificationsRequestBodySchema, TemperaturesResponseSchema } from '../schemas/validationSchemas';
import { getTemperature } from '../services/temperaturesService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const validatedBody = NotificationsRequestBodySchema.safeParse(req.body);

  if (validatedBody.success) {
    const to = validatedBody.data.to;
    const temperatureData = await getTemperature({ req });
    const validationResult = TemperaturesResponseSchema.safeParse(temperatureData);
      
    if (validationResult.success) {
      const { temperature, location } = validationResult.data;

      try {
        const messagesSendResult = await sendEmail({
          from: "Mailgun Sandbox <postmaster@sandbox48a116e5df0e4bdeb2861de95c76aef6.mailgun.org>",
          to,
          subject: `Current temperature in ${location} is ${temperature} °C`,
          text: `The current temperature in ${location} is ${temperature} °C degrees.`,
        });

        res.status(200).json({ status: messagesSendResult.status === 200 ? "ok" : "nok", message: messagesSendResult.message });
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      const errors = validationResult.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      res.status(400).json({ errors });
    }
  } else {
    const errors = validatedBody.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    
    res.status(400).json({ errors });
  }
});

export default router;