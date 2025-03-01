import { z } from 'zod';
import { WeatherSchema, NotificationsRequestBodySchema, TemperaturesResponseSchema, NotificationResponseSchema } from '../schemas/validationSchemas';

export type Weather = z.infer<typeof WeatherSchema>;
export type NotificationsRequestBody = z.infer<typeof NotificationsRequestBodySchema>;
export type TemperaturesResponse = z.infer<typeof TemperaturesResponseSchema>;
export type NotificationResponse = z.infer<typeof NotificationResponseSchema>;
