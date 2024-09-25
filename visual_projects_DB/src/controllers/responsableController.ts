import { Request, Response } from "express";
import { initModels} from "../models/init-models"
import { sequelize } from "../db/conection";
let initModel= initModels(sequelize)
import { responseMessage } from "../helpers/utils";


/**
 * Función para buscar todos los usuarios registrados en  el sistema
 */

export async function buscarResponsables(req: Request, res: Response) {
  try {
    const user :any = await initModel.usuario.findAll({});
    if(user)
    {
      return  responseMessage(res, 202, user,"usuarios registrados");
    }
    else{
        return  responseMessage(res, 404, false,"no existen usuarios registrados");
    }
  } catch (error) {
    return  responseMessage(res, 503, error,"error server ...");
  }
}
