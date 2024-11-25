import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";

/**
 * @description Esta función crea una planeación asociada a un proyecto específico. 
 * Durante el proceso, también crea un cronograma asociado a la planeación y actualiza 
 * el proyecto para enlazarlo con la planeación y el cronograma creados.
 * 
 * @route POST /crear-planeacion
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el cuerpo de la solicitud en formato JSON con los siguientes datos:
 * - `idProyecto` (number): Identificador único del proyecto al que se asociará la planeación.
 * - `objetivoProyecto` (string): Objetivo de la planeación. Ejemplo: `"Completar la implementación del sistema en 6 meses"`.
 * - `presupuestoProyecto` (number): Presupuesto asignado para la planeación. Ejemplo: `100000`.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 202: Si la planeación y el cronograma se crean con éxito, y el proyecto se actualiza correctamente.
 *   - El cuerpo de la respuesta incluye el proyecto actualizado.
 * - 501: Si ocurre un error al crear la planeación, cronograma o al actualizar el proyecto.
 * - 503: Si ocurre un error en el servidor durante la operación.
 * 
 * @throws {Error} Si ocurre un error durante la creación de la planeación, el cronograma o la actualización del proyecto.
 */

export async function crearPlaneacion(req: Request, res: Response) {
    try {
      req = req.body.data.planeacion;
      const { idProyecto }: any = req;
      const { objetivoProyecto }: any = req;
      const { presupuestoProyecto }: any = req;
      const planeacion = await initModel.planeacion.create({
        objetivo:objetivoProyecto,
        presupuesto:presupuestoProyecto
      });
      if(planeacion)
      {
        let idPlaneacion = planeacion.dataValues.idPlaneacion
        const cronograma = await initModel.cronograma.create({
            Planeacion_idPlaneacion:idPlaneacion
        });
        let idCronograma = cronograma.dataValues.idCronograma
        let data = {
            Planeacion_idPlaneacion:idPlaneacion,
            Cronograma_idCronograma:idCronograma 
        }
        const proyectoUpdate = await initModel.proyecto.update(data,{
            where:{idProyecto:idProyecto}
        });

        const proyecto = await initModel.proyecto.findOne({
          where:{idProyecto:idProyecto}
      });
        if(proyectoUpdate.length>0)
        {
            return  responseMessage(res,202, [proyecto],"proyecto creado correctamente");
        }
        else{
            return  responseMessage(res, 501, false,"error al crear el proyecto de la planeación...");
        }
      
      }
      else{
        return  responseMessage(res, 501, false,"error al crear la planeación...");
      }
      
    } catch (error) {
      return  responseMessage(res, 503, error,"error server ...");
    }
}
  
  