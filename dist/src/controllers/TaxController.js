"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
/*
//caso queira alterar uma tabela dentro de outra
interface ScheduleItem{
  name: string;
  email: string;
  whatsapp: string;
}
*/
class TaxController {
    async index(req, res) {
        const filters = req.query;
        const name = filters.name;
        const email = filters.email;
        const whatsapp = filters.whatsapp;
        if (!name || !email || !whatsapp) {
            return res.status(400).json({
                error: 'Missing filters to search taxusers'
            });
        }
        const data = await (0, connection_1.default)('taxusers')
            .where('taxusers.name', '=', name)
            .orWhere('taxusers.email', '=', email)
            .orWhere('taxusers.whatsapp', '=', whatsapp)
            .select('taxusers.*');
        return res.json(data);
    }
    async listAll(req, res) {
        const classes = await (0, connection_1.default)('taxusers')
            .select('taxusers.*');
        return res.json(classes);
    }
    async delete(req, res) {
        const filters = req.params;
        const id = filters.id;
        if (!id) {
            return res.status(400).json({
                error: 'Missing filters to search taxusers'
            });
        }
        await (0, connection_1.default)('taxusers')
            .where('taxusers.id', '=', id)
            .del()
            .select('taxusers.*');
        return res.status(201).json({
            message: 'Valor deleted'
        });
    }
    async create(req, res) {
        const { name, email, whatsapp } = req.body;
        //transAction: desfazer todas as operacoes se alguma insercao falhar
        const trx = await connection_1.default.transaction();
        try {
            await trx('taxusers').insert({
                name,
                email,
                whatsapp,
            });
            await trx.commit();
            return res.status(201).json({
                message: 'Criado com sucesso'
            });
        }
        catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new taxusers'
            });
        }
    }
}
exports.default = TaxController;
