import { Request , Response } from 'express';

import db from '../database/connection';

/*
//caso queira alterar uma tabela dentro de outra
interface ScheduleItem{
  name: string;
  email: string;
  whatsapp: string;
}
*/

export default class TaxController{
  async index(req: Request , res: Response){
    const filters = req.query;

    const name = filters.name as string;
    const email = filters.email as string;
    const whatsapp = filters.whatsapp as string;


    if(!name || !email || !whatsapp ){
      return res.status(400).json({
        error: 'Missing filters to search taxusers'
      })
    }

    const data = await db('taxusers')
      .where('taxusers.name','=',name)
      .orWhere('taxusers.email','=',email)
      .orWhere('taxusers.whatsapp','=',whatsapp)
      .select('taxusers.*');
      
    return res.json(data);
  }

  async listAll(req: Request , res: Response){
    const classes = await db('taxusers')
      .select('taxusers.*');
    return res.json(classes);
  }

  async delete(req: Request , res: Response){
    const filters = req.params;
    const id = filters.id as string;

    if(!id){
      return res.status(400).json({
        error: 'Missing filters to search taxusers'
      })
    }

    await db('taxusers')
      .where('taxusers.id','=',id)
      .del()
      .select('taxusers.*');

    return res.status(201).json({
      message: 'Valor deleted'
    });
  }
  
  async create(req : Request, res : Response){
    const {
      name,
      email,
      whatsapp
    }= req.body;
  
    //transAction: desfazer todas as operacoes se alguma insercao falhar
    const trx = await db.transaction();
  
    try{
      
    await trx('taxusers').insert({
      name,
      email,
      whatsapp,
    });
    await trx.commit();
    
    return res.status(201).json({
      message: 'Criado com sucesso'
    });
    }catch(err){
      await trx.rollback();
      return res.status(400).json({
        error:'Unexpected error while creating new taxusers'
      })
    }
    
  }
}