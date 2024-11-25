import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
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

/**
 * @description Esta función consulta las metas asociadas a un cronograma específico. 
 * Incluye información sobre el estado de las metas, el progreso de actividades y tareas asociadas.
 * 
 * @route GET /consultar-metas-proyecto/:idCronograma
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idCronograma` (string): ID del cronograma asociado a las metas.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta con los datos de las metas y su progreso:
 * - 200: Si se encuentran metas asociadas al cronograma.
 *   - Incluye información sobre:
 *     - Estados de las metas.
 *     - Actividades y tareas organizadas por estado (`Inicial`, `Organización`, `Ejecución`, `Finalizadas`).
 *     - Totales de actividades y tareas.
 * - 404: Si no existen metas asociadas al cronograma.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la consulta o procesamiento de datos.
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

/**
 * @description Crea una nueva meta asociada a un cronograma específico.
 * 
 * @route POST /crear-meta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idCronograma` (number): ID del cronograma al que se asociará la meta.
 * - `nombre` (string): Nombre de la meta.
 * - `descripcion` (string): Descripción de la meta.
 * - `presupuesto` (number): Presupuesto asignado (opcional, inicializado como 0).
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta con el resultado de la creación:
 * - 200: Si la meta fue creada exitosamente.
 * - 500: Si ocurrió un error durante la creación de la meta.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la creación de la meta.
 */

export async function crearMeta(req: Request, res: Response) {
  try {
    req = req.body.data.goal;
    const { idCronograma }: any = req;
    const { nombre }: any = req;
    const { descripcion }: any = req;
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

/**
 * @description Cuenta el número de metas en diferentes estados asociados a un cronograma.
 * 
 * @route POST /contar-estado-metas
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idCronograma` (number): ID del cronograma cuyas metas se desean contar.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta con los conteos de metas por estado:
 * - 200: Si se obtienen los conteos correctamente.
 *   - Devuelve un array con los totales en el siguiente orden:
 *     - Metas en estado `Inicio`.
 *     - Metas en estado `Organización`.
 *     - Metas en estado `Ejecución`.
 *     - Metas en estado `Finalizado`.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante el cálculo de los estados.
 */

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
 * @description Consulta una meta específica y calcula el presupuesto total de sus actividades cerradas.
 * 
 * @route GET /consultar-presupuesto-meta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idMeta` (number): ID de la meta a consultar.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta con los datos de la meta y su presupuesto:
 * - 200: Si se encuentra la meta.
 *   - Incluye:
 *     - Datos de la meta.
 *     - `presupuestoCerrado`: Suma de los presupuestos de las actividades cerradas.
 * - 404: Si no se encuentra ninguna meta con el ID proporcionado.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la consulta o el cálculo del presupuesto.
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
        await initModel.meta.update(estadoMeta, {
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
        let estadoMeta = {
          Estado_idEstado: tareaMaxima,
        };
       await initModel.meta.update(estadoMeta, {
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

/**
 * @description Elimina una meta específica y todos sus datos relacionados, incluyendo actividades, tareas y recursos asociados.
 * 
 * @route DELETE /eliminar-meta/:idMeta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene:
 * - `idMeta` (number): ID de la meta a eliminar.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si la meta y todos los datos relacionados fueron eliminados exitosamente.
 * - 404: Si no se pudo eliminar la meta.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la eliminación de la meta o sus datos relacionados.
 */

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

/**
 * @description Actualiza el nombre y la descripción de una meta específica.
 * 
 * @route PUT /actualizar-meta
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene en el cuerpo:
 * - `idMeta` (number): ID de la meta a actualizar.
 * - `nombre` (string): Nuevo nombre de la meta.
 * - `descripcion` (string): Nueva descripción de la meta.
 * 
 * @param {Response} res - El objeto de la respuesta HTTP.
 * 
 * @returns {Response} - Devuelve una respuesta indicando el estado de la operación:
 * - 200: Si la meta fue actualizada exitosamente.
 * - 500: Si ocurrió un error al intentar actualizar la meta.
 * - 503: Si ocurre un error en el servidor.
 * 
 * @throws {Error} Si ocurre un error durante la actualización de la meta.
 */

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