import express from 'express';
import TaxController from './controllers/TaxController';

const routes = express.Router();

const taxController = new TaxController();
routes.get('/taxusers', taxController.index);
routes.post('/taxusers', taxController.create);

routes.get('/taxusers/list', taxController.listAll);

routes.delete('/taxusers/:id', taxController.delete);
export default routes;