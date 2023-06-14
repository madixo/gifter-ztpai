import {Router} from 'express';
import ContributionsController from '../controllers/ContributionsController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import GiftsController from '../controllers/GiftsController';
import ListsController from '../controllers/ListsController';
import LoginController from '../controllers/LoginController';
import PasswordResetController from '../controllers/PasswordResetController';
import RegisterController from '../controllers/RegisterController';

const router = Router();

router.get('/user/:id/lists', ListsController.get);

router.get('/user/:id/contributions', ContributionsController.get);

router.post('/register', RegisterController.post);

router.post('/login', LoginController.post);

router.get('/list/:id', GiftsController.get);

router.delete('/list/:id', ListsController.delete);

router.post('/list', ListsController.post);

router.delete('/lists', ListsController.delete);

router.patch('/list/:id', ListsController.patch);

router.post('/forgot-password', ForgotPasswordController.post);

router.post('/password-reset', PasswordResetController.post);

export default router;