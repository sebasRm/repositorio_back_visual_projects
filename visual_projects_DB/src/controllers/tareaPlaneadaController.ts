import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";
import {
  findTaskActive,
  findTaskFinish,
  findTaskInitial,
  findTaskOrganization,
  findTaskEjecution,
  findTotalTask
} from "../services/findTask";

/**
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
 */
export async function buscarTareaPlaneada(req: Request, res: Response) {
  req = req.body.data.task;
  const { nombreTarea }: any = req;
  try {
    if (nombreTarea) {
      let tarea = await initModel.tareaplaneada.findOne({
        where: { nombre: nombreTarea },
      });      
      return responseMessage(
        res,
        200,
        tarea,
        "Informacion de contador de total de actividades planeadas, reales, terminadas y activas y tareas."
      );
    } else {
      return responseMessage(
        res,
        400,
        "Error al buscar la tarea",
        "el id esta en null"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}