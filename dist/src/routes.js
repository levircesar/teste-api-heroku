"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaxController_1 = __importDefault(require("./controllers/TaxController"));
const routes = express_1.default.Router();
const taxController = new TaxController_1.default();
routes.get('/taxusers', taxController.index);
routes.post('/taxusers', taxController.create);
routes.get('/taxusers/list', taxController.listAll);
routes.delete('/taxusers/:id', taxController.delete);
exports.default = routes;
