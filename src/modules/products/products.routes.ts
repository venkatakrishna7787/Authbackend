
import express from 'express'
import { createProduct } from './products.controller';
import { reqValidator } from '../../middlewares/reqValidator.middleware';
import { productSchema } from './products.validator';

const productsRouter = express.Router();

productsRouter.post('/createProduct', reqValidator(productSchema), createProduct)

export default productsRouter;