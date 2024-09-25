import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";


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
  
  