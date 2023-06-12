import {Router} from 'express';
import ContributionsController from '../controllers/ContributionsController';
import GiftListsController from '../controllers/GiftListsController';
import ListsController from '../controllers/ListsController';
import LoginController from '../controllers/LoginController';
import RegisterController from '../controllers/RegisterController';

const router = Router();

router.get('/user/:id/lists', ListsController.get);

router.get('/user/:id/contributions', ContributionsController.get);

router.post('/register', RegisterController.post);

router.post('/login', LoginController.post);

router.get('/list/:id', GiftListsController.get);

router.delete('/list/:id', GiftListsController.delete);

router.post('/list', GiftListsController.post);

router.patch('/list/:id', GiftListsController.patch)

router.get('/cookie', (req, res) => {
    res.status(200).json({'signed': req.signedCookies, 'cookies': req.cookies});
});

export default router;