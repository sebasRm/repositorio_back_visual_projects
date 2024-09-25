import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
import Sequelize, { Op } from "sequelize";
import {
  findStateGoalService,
  findActivitiesState,
  findActivitiesTotal,
  findTaskState,
  findTaskTotal,
} from "../services/findGoals";
import {
  findActivitiesEjecutionGoal,
  findActivitiesFinishGoal,
  findActivitiesInitialGoal,
  findActivitiesOrganizationGoal,
} from "../services/findActivities";
let initModel = initModels(sequelize);
/*
   => Funcion para consultar todos los proyectos
*/
export async function consultarMetasProyecto(req: Request, res: Response) {
  try {
    let idCronograma = req.params.idCronograma;
    const cronogramaExist: any = await initModel.meta.findAll({
      where: { Cronograma_idCronograma: idCronograma },
      include: [
        { model: initModel.estado, as: "Estado_", attributes: ["nombre"] },
      ],
    });

    if (cronogramaExist.length > 0) {
      for (const goal in cronogramaExist) {
        let activitiesInitial = await findActivitiesState(
          cronogramaExist[goal].dataValues.idMeta,
          1
        );
        let activitiesOrganization = await findActivitiesState(
          cronogramaExist[goal].dataValues.idMeta,
          2
        );
        let activitiesEjecution = await findActivitiesState(
          cronogramaExist[goal].dataValues.idMeta,
          3
        );
        let activitiesFinish = await findActivitiesState(
          cronogramaExist[goal].dataValues.idMeta,
          4
        );
        let activitiesTotal = await findActivitiesTotal(
          cronogramaExist[goal].dataValues.idMeta
        );
        let noActivity
        if (
          activitiesInitial === 0 &&
          activitiesOrganization === 0 &&
          activitiesEjecution === 0 &&
          activitiesFinish === 0
          
        ) {
          noActivity = 0.0001;
        }
        let totalActivitiesGoal = [
          activitiesInitial,
          activitiesOrganization,
          activitiesEjecution,
          activitiesFinish,
          noActivity
        ];

        let taskInitial = await findTaskState(
          cronogramaExist[goal].dataValues.idMeta,
          1
        );
        let taskOrganization = await findTaskState(
          cronogramaExist[goal].dataValues.idMeta,
          2
        );
        let taskEjecution = await findTaskState(
          cronogramaExist[goal].dataValues.idMeta,
          3
        );
        let taskFinish = await findTaskState(
          cronogramaExist[goal].dataValues.idMeta,
          4
        );
        let taskTotal = await findTaskTotal(
          cronogramaExist[goal].dataValues.idMeta
        );
        if (
          taskInitial === 0 &&
          taskOrganization === 0 &&
          taskEjecution === 0 &&
          taskFinish === 0
        ) {
          noActivity = 0.0001;
        }
        let totaltaskGoal = [
          taskInitial,
          taskOrganization,
          taskEjecution,
          taskFinish,
          noActivity
        ];
        cronogramaExist[goal].dataValues.totalActivitiesGoal =
          totalActivitiesGoal;
        cronogramaExist[goal].dataValues.activitiesTotal = activitiesTotal;
        cronogramaExist[goal].dataValues.totaltaskGoal = totaltaskGoal;
        cronogramaExist[goal].dataValues.taskTotal = taskTotal;
      }

      return responseMessage(
        res,
        200,
        cronogramaExist,
        "Metas asociadas al proyecto"
      );
    } else {
      return responseMessage(
        res,
        404,
        false,
        "no existen metas asociadas al proyecto"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function crearMeta(req: Request, res: Response) {
  try {
    req = req.body.data.goal;
    const { idCronograma }: any = req;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const createGoal: any = await initModel.meta.create({
      nombre: nombre,
      descripcion: descripcion,
      presupuesto: 0,
      Cronograma_idCronograma: idCronograma,
      Estado_idEstado: 1,
    });
    if (createGoal) {
      return responseMessage(res, 200, createGoal, "Meta creada con exito");
    } else {
      return responseMessage(res, 500, false, "Error al crear la meta");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function contarEstadoMetas(req: Request, res: Response) {
  try {
    req = req.body.data.goal;
    const { idCronograma }: any = req;
    let stateStart = await findStateGoalService(idCronograma, 1);
    let stateOrganization = await findStateGoalService(idCronograma, 2);
    let stateExecution = await findStateGoalService(idCronograma, 3);
    let stateFinish = await findStateGoalService(idCronograma, 4);

    stateStart = stateStart[0].dataValues.contadorMetas
      ? stateStart[0].dataValues.contadorMetas
      : 0;
    stateOrganization = stateOrganization[0].dataValues.contadorMetas
      ? stateOrganization[0].dataValues.contadorMetas
      : 0;
    stateExecution = stateExecution[0].dataValues.contadorMetas
      ? stateExecution[0].dataValues.contadorMetas
      : 0;
    stateFinish = stateFinish[0].dataValues.contadorMetas
      ? stateFinish[0].dataValues.contadorMetas
      : 0;

    return responseMessage(
      res,
      200,
      [stateStart, stateOrganization, stateExecution, stateFinish],
      "Meta creada con exito"
    );
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * Funcion para contar el total de las activiades planeadas asociadas a un cronograma del proyecto.
 */
export async function consultarPresupuestoMeta(req: Request, res: Response) {
  let idMeta = req.params.idMeta;
  try {
    let meta:any = await initModel.meta.findOne({
      where: { idMeta: idMeta },
      include: [
        {
          model: initModel.actividad,
          as: "actividads",
          required: false,
            where: {
              Estado_idEstado: 4,
            },              
        },
      ],
    });
    console.log("soy la meta", meta)
    if (meta) {
     
      let presupuestoActividadesCerradas:any = 0
      if(meta.dataValues?.actividads.length>0)
      {
        let actividades = meta.dataValues?.actividads
        for (const actividad in actividades)
        {
          let presupuesto = actividades[actividad].dataValues.presupuesto
          presupuestoActividadesCerradas += presupuesto
        }
      }  
      meta.dataValues.presupuestoCerrado = presupuestoActividadesCerradas
      delete meta.dataValues.actividads
      return responseMessage(res, 200, meta, "Meta.");
    } else {
      return responseMessage(
        res,
        404,
        false,
        "Error no se encontro ninguna meta"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function actualizarMetaEstado(req: Request, res: Response) {
  try {
    req = req.body.data.goal;
    const { idMeta }: any = req;
    if (idMeta !== null) {
      let activityInitial = await findActivitiesInitialGoal(idMeta);
      let activityOrganization = await findActivitiesOrganizationGoal(idMeta);
      let activityEjecution = await findActivitiesEjecutionGoal(idMeta);
      let activityFinish = await findActivitiesFinishGoal(idMeta);

      if (
        activityInitial == 0 &&
        activityOrganization == 0 &&
        activityEjecution == 0 &&
        activityFinish == 0
      ) {
        let estadoMeta = {
          Estado_idEstado: 1,
        };
        const actividad: any = await initModel.meta.update(estadoMeta, {
          where: {
            idMeta: idMeta,
          },
        });
      } else {
        const maxTarea = Math.max(
          activityInitial,
          activityOrganization,
          activityEjecution,
          activityFinish
        );
        // Determina cuál variable tiene el valor máximo
        let tareaMaxima: any;
        if (maxTarea === activityInitial) {
          tareaMaxima = 1;
        } else if (maxTarea === activityOrganization) {
          tareaMaxima = 2;
        } else if (maxTarea === activityEjecution) {
          tareaMaxima = 3;
        } else if (maxTarea === activityFinish) {
          const maxTarea = Math.max(
            activityInitial,
            activityOrganization,
            activityEjecution
          );
          if (maxTarea !== 0) {
            if (maxTarea === activityInitial) {
              tareaMaxima = 1;
            } else if (maxTarea === activityOrganization) {
              tareaMaxima = 2;
            } else if (maxTarea === activityEjecution) {
              tareaMaxima = 3;
            }
          } else {
            tareaMaxima = 4;
          }
        }
        console.log("soy la tareaMaxima", tareaMaxima)
        let estadoMeta = {
          Estado_idEstado: tareaMaxima,
        };
        const actividad: any = await initModel.meta.update(estadoMeta, {
          where: {
            idMeta: idMeta,
          },
        });
      }
      return responseMessage(
        res,
        200,
        [
          activityInitial,
          activityOrganization,
          activityEjecution,
          activityFinish,
        ],
        "Meta actualizada con exito."
      );
    } else {
      return responseMessage(
        res,
        200,
        [0, 0.1],
        "Error al obtener porcentaje del proyecto"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function eliminarMeta(req: Request, res: Response) {
  try {
    let idMeta: any = req.params.idMeta;

    let actividades = await initModel.actividad.findAll({
      where: { Meta_idMeta: idMeta },
    });

    if (actividades.length > 0) {
      for (const actividad in actividades) {
        let idActividad = actividades[actividad].dataValues.idActividad;
        let tareas = await initModel.tarea.findAll({
          where: { Actividad_idActividad: idActividad },
        });
        if (tareas.length > 0) {
          for (const tarea in tareas) {
            let idTarea = tareas[tarea].dataValues.idTarea;
            await initModel.recurso.destroy({
              where: { Tarea_idTarea: idTarea },
            });
            await initModel.tarea.destroy({
              where: { idTarea: idTarea },
            });
          }
        }
        await initModel.recurso.destroy({
          where: { Actividad_idActividad: idActividad },
        });
        await initModel.actividad.destroy({
          where: { idActividad: idActividad },
        });
      }
    }

    // Eliminar las actividades y tareas planeadas
    let actividadesPlaneadas = await initModel.actividadplaneada.findAll({
      where: { Meta_idMeta: idMeta },
    });

    if (actividadesPlaneadas.length > 0) {
      for (const actividad in actividadesPlaneadas) {
        let idActividad = actividadesPlaneadas[actividad].dataValues.idActividadPlaneada;
        let tareas = await initModel.tareaplaneada.findAll({
          where: { ActividadPlaneada_idActividadPlaneada: idActividad },
        });
        if (tareas.length > 0) {
          for (const tarea in tareas) {
            let idTarea = tareas[tarea].dataValues.idTareaPlaneada;
            await initModel.tareaplaneada.destroy({
              where: { idTareaPlaneada: idTarea },
            });
          }
        }
        await initModel.actividadplaneada.destroy({
          where: { idActividadPlaneada: idActividad },
        });
      }
    }

    

    let metaDeleted = await initModel.meta.destroy({
      where: { idMeta: idMeta },
    });
    if (metaDeleted) {
      return responseMessage(
        res,
        200,
        metaDeleted,
        "Se elimino la meta exitosamente"
      );
    } else {
      return responseMessage(res, 404, [], "Erro al eliminar la meta");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function actualizarMeta(req: Request, res: Response) {
  try {
    req = req.body.data.goal;
    const { idMeta }: any = req;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const meta = {
      nombre:nombre,
      descripcion:descripcion
    }
    const updateGoal: any = await initModel.meta.update(meta,{
        where:{idMeta:idMeta}
    });
    if (updateGoal) {
      return responseMessage(res, 200, updateGoal, "Meta actualizada con exito");
    } else {
      return responseMessage(res, 500, false, "Error al actualizar la meta");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}