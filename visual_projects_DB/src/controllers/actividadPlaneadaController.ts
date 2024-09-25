import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";
import {
  findTotalActivitiesPlanned,
  findTotalActivities,
  findActivitiesFinish,
  findActivitiesInitial,
  findActivitiesActive,
} from "../services/findActivities";
import {
  findTotalTaskPlanned,
  findTaskFinish,
  findTaskActive,
  findTotalTask,
} from "../services/findTask";
/**
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
 */
export async function informationIndicators(req: Request, res: Response) {
  req = req.body.data.activity;
  const { idCronograma }: any = req;
  try {
    if (idCronograma) {
      let totalActivitiesPlanned = await findTotalActivitiesPlanned(
        idCronograma
      );
      let totalActivities = await findTotalActivities(idCronograma);
      let activitiesFinish = await findActivitiesFinish(idCronograma);
      let activitiesActive = await findActivitiesActive(idCronograma);
     
      let totalTask = await findTotalTask(idCronograma);
      let taskFinish = await findTaskFinish(idCronograma);
      let taskActive = await findTaskActive(idCronograma);
      let totalTaskPlanned = await findTotalTaskPlanned(idCronograma);
  
      return responseMessage(
        res,
        200,
        {
          totalActivitiesPlanned,
          totalActivities,
          activitiesFinish,
          activitiesActive,
          totalTaskPlanned,
          totalTask,
          taskFinish,
          taskActive,
        },
        "Informacion de contador de total de actividades planeadas, reales, terminadas y activas y tareas."
      );
    } else {
      return responseMessage(
        res,
        200,
        [{ contadorActividad: 0 }],
        "el id esta en null"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}


/**
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
 */
export async function buscarActividadPlaneada(req: Request, res: Response) {
  req = req.body.data.activity;
  const { nombreActividad }: any = req;
  try {
    if (nombreActividad) {
      let actividad = await initModel.actividadplaneada.findOne({
        where: { nombre: nombreActividad },
      });      
      return responseMessage(
        res,
        200,
        actividad,
        "Informacion de contador de total de actividades planeadas, reales, terminadas y activas y tareas."
      );
    } else {
      return responseMessage(
        res,
        400,
        "Error al busca la actividad",
        "el id esta en null"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}
