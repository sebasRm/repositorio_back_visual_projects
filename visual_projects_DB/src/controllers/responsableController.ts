import { Request, Response } from "express";
import { initModels} from "../models/init-models"
import { sequelize } from "../db/conection";
let initModel= initModels(sequelize)
import { responseMessage } from "../helpers/utils";

/**
 * @description Esta función busca todos los usuarios registrados en el sistema.
 * Realiza una consulta a la base de datos para obtener todos los registros de la tabla de usuarios.
 * Luego, valida si existen usuarios en la base de datos y devuelve la lista de usuarios en caso de que haya resultados.
 * Si no se encuentran usuarios, devuelve un mensaje indicando que no existen registros de usuarios.
 * 
 * @route GET /responsables
 * @param {Request} req - El objeto de la solicitud HTTP.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si se encuentran usuarios registrados, devuelve la lista de usuarios.
 * - 404: Si no existen usuarios registrados, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
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
