import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);

/**
 * Función para buscar una tarea planeada en el sistema.
 * Dado el nombre de una tarea, consulta la base de datos para obtener la información asociada.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos enviados por el cliente.
 *                         Espera que el cuerpo de la solicitud tenga la estructura `{ data: { task: { nombreTarea } } }`.
 * @param {Response} res - Objeto de respuesta HTTP para enviar el resultado de la consulta.
 *
 * @returns {Response} - Responde con diferentes códigos y mensajes según el resultado:
 *    - 200: Tarea encontrada exitosamente, retorna la información de la tarea.
 *    - 400: Error en la solicitud, el nombre de la tarea no fue proporcionado.
 *    - 503: Error en el servidor durante la consulta.
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
