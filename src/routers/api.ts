import express from 'express';
import temperaturesRouter from './temperaturesRouter';

const api = express.Router();

api.use('/temperatures', temperaturesRouter);

export default api;