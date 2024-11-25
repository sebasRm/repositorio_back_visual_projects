import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import {
  findTotalActivitiesPlanned,
  findTotalActivities,
  findActivitiesFinish,
  findActivitiesActive,
} from "../services/findActivities";
import {
  findTotalTaskPlanned,
  findTaskFinish,
  findTaskActive,
  findTotalTask,
} from "../services/findTask";

/**
 * @description Obtiene información relacionada con los indicadores del cronograma de un proyecto.
 * La función calcula y devuelve el total de actividades planeadas, actividades reales, actividades terminadas,
 * actividades activas, tareas planeadas, tareas reales, tareas terminadas y tareas activas asociadas a un cronograma.
 * 
 * @route POST /informationIndicators
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `idCronograma` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la información de los indicadores se obtuvo correctamente, con los valores de las actividades y tareas.
 * - 400: Si no se proporciona un `idCronograma` o si no existe un valor válido.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante el cálculo de los indicadores o al consultar la base de datos.
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
 * @description Busca y devuelve información sobre una actividad planeada específica mediante su nombre.
 * La función consulta la base de datos para obtener los detalles de una actividad planeada con el nombre proporcionado.
 * 
 * @route POST /buscarActividadPlaneada
 * @param {Request} req - El objeto de la solicitud HTTP, que debe contener el `nombreActividad` en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta con los siguientes posibles resultados:
 * - 200: Si la actividad planeada se encuentra correctamente, devuelve los detalles de la actividad.
 * - 400: Si no se proporciona un `nombreActividad` o si ocurre un error al buscar la actividad.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error al buscar la actividad en la base de datos.
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
