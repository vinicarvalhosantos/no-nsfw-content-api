import express from 'express';
import { imageContentRouter } from './check-image';

export const v1Router = express.Router();
v1Router.use('/image-content', imageContentRouter);
