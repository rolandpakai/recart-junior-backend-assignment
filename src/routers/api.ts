import express from 'express';
import temperaturesRouter from './temperaturesRouter';
import notificationsRouter from './notificationsRouter';
import recurringNotificationsRouter from './recurringNotificationsRouter';

const api = express.Router();

api.use('/temperatures', temperaturesRouter);
api.use('/notifications', notificationsRouter);
api.use('/recurring_notifications', recurringNotificationsRouter);

export default api;