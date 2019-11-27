import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/Multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';
import authMiddleware from './app/middlewares/auth';
import OrganizingController from './app/controllers/OrganizingController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', authMiddleware, UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.get('/meetups', MeetupController.index);
routes.delete('/meetups/:id', MeetupController.delete);

routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);
routes.get('/subscriptions', SubscriptionController.index);
routes.delete('/subscriptions/:id', SubscriptionController.delete);
routes.get('/organizing', OrganizingController.index);

export default routes;
