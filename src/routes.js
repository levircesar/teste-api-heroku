const express = require('express');
const cors = require('cors');
const path = require('path');

const taxController = require('./controllers/TaxController')

const routes = express.Router();

routes.get('/taxusers', taxController.index);
routes.post('/taxusers', taxController.create);

routes.get('/taxusers/list', taxController.listAll);

routes.delete('/taxusers/:id', taxController.delete);
module.exports = routes;