import Router from '@koa/router';
import * as homeController from '../controllers/home.controller';
import * as mealController from '../controllers/meal.controller';
import { mealHandler } from '../middlewares/meal.handler';

const router = new Router();

router.get('/', homeController.index);
router.get('/meals', mealController.allMeals);
router.get('/meals/:id', mealController.mealsByUser);
router.post('/meals', mealHandler, mealController.create);
router.put('/meals/:id', mealHandler, mealController.update);

export default router.routes();
