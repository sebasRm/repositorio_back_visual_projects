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
 * Funcion para contar el total de las activiades asociadas a un cronograma del proyecto.
 */
export async function contarTotalTareas(req: Request, res: Response) {
  req = req.body.data.activity;
  const { idCronograma }: any = req;
  try {
    if (idCronograma) {
      // console.log("soy el contadorTareas", idCronograma)
      let totalTotal:any =await findTotalTask(idCronograma)
      //console.log("soy el totalTotal", totalTotal)
      if (totalTotal) {

          return responseMessage(
            res,
            200,
            totalTotal,
            "Total de las activiades asociadas a un cronograma del proyecto"
          );

      } else {
        return responseMessage(
          res,
          200,
          0,
          "Total de las activiades asociadas a un cronograma del proyecto"
        );
      }
    } else {
      return responseMessage(
        res,
        200,
         0,
        "Total de las activiades asociadas a un cronograma del proyecto"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Funcion para crear el porcetaje de las tareas cuto estado esta en cierre o 4
*/
export async function porcentajeTareasTermidas(req: Request, res: Response) {
  try {
    req = req.body.data.activity;
    const { idCronograma }: any = req;
    if (idCronograma !== null) {
      let tareasInitial = await findTaskInitial(idCronograma);
      let tareasOrganization = await findTaskOrganization(idCronograma);
      let tareasEjecution = await findTaskEjecution(idCronograma);
      let tareasFinish = await findTaskFinish(idCronograma);
      let noActivity
     
      if (
        tareasInitial == 0 &&
        tareasOrganization == 0 &&
        tareasEjecution == 0 &&
        tareasFinish == 0
      ) {
        noActivity = 0.0001;
      }
      return responseMessage(
        res,
        200,
        [tareasInitial, tareasOrganization, tareasEjecution, tareasFinish, noActivity],
        "Total de las activiades Activas asociadas a un cronograma del proyecto."
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

export async function crearTarea(req: Request, res: Response) {
  req = req.body.data.task;
  const { nombre }: any = req;
  const { descripcion }: any = req;
  const { presupuesto }: any = req;
  const { fechaInicio }: any = req;
  const { fechaFinal }: any = req;
  const { usuario }: any = req;
  const { idActividad }: any = req;
  const { nombreActividad }: any = req;
  let createPlannedExist = await initModel.tarea.findOne({
    where: { nombre: nombre, Actividad_idActividad: idActividad },
  });
  if (!createPlannedExist) {
    let responsableExist = await initModel.responsable.findOne({
      where: { Usuario_idUsuario: usuario },
    });
    !responsableExist
      ? (responsableExist = await initModel.responsable.create({
          Usuario_idUsuario: usuario,
        }))
      : "";
    let idResponsable = responsableExist.dataValues.idResponsable;

    let activityPlanned = await initModel.actividadplaneada.findOne({
      where: { nombre: nombreActividad },
    });

    let idActivityPlanned: any =
      activityPlanned?.dataValues.idActividadPlaneada;
    let createdPlannedTask = await initModel.tareaplaneada.create({
      nombre: nombre,
      descripcion: descripcion,
      presupuesto: presupuesto,
      fechaInicio: fechaInicio,
      FechaFinal: fechaFinal,
      Estado_idEstado: 1,
      ActividadPlaneada_idActividadPlaneada: idActivityPlanned,
      Responsable_idResponsable: idResponsable,
      cronogramaOriginal:
        activityPlanned?.dataValues.cronogramaOriginal === 1 ? 1 : 0,
    });
    if (createdPlannedTask) {
      let createTask = await initModel.tarea.create({
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: 0,
        Estado_idEstado: 1,
        Actividad_idActividad: idActividad,
        Responsable_idResponsable: idResponsable,
      });

      if (createTask) {
       /* let activity = await initModel.actividad.findOne({
          where: { idActividad: idActividad },
        });
        let presupuestoActivity: any = activity?.dataValues.presupuesto;
        let presupuestoUpdate = {
          presupuesto: parseInt(presupuestoActivity) + parseInt(presupuesto),
        };

        await initModel.actividad.update(presupuestoUpdate, {
          where: { idActividad: idActividad },
        });*/
        return responseMessage(res, 200, createTask, "Tarea creada con exito");
      } else {
        return responseMessage(res, 400, false, "Error al crear la Tarea");
      }
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error al crear la actividad planeada"
      );
    }
  } else {
    return responseMessage(
      res,
      400,
      false,
      "Error el nombre ya se encuentra registrado"
    );
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function consultarTareasActividad(req: Request, res: Response) {
  try {
    let idActividad = req.params.idActividad;
    const lideres: any = await initModel.tarea.findAll({
      where: { Actividad_idActividad: idActividad },
      include: [
        {
          model: initModel.responsable,
          as: "Responsable_",
          include: [
            {
              model: initModel.usuario,
              as: "Usuario_",
              attributes: { exclude: ["contrasena"] },
            },
          ],
        },
        {
          model: initModel.estado,
          as: "Estado_",
        },
      ],
    });
    if (lideres.length > 0) {
      return responseMessage(res, 200, lideres, "Proyecto asociado al líder");
    } else {
      return responseMessage(
        res,
        200,
        [],
        "No existen tareas asociados a una actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
export async function consultarTareasActividadInicio(
  req: Request,
  res: Response
) {
  try {
    let idActividad = req.params.idActividad;
    const lideres: any = await initModel.tarea.findAll({
      where: { Actividad_idActividad: idActividad, Estado_idEstado: 1 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idTarea);
      }
      return responseMessage(
        res,
        200,
        arrayLideres,
        "Proyecto asociado al líder"
      );
    } else {
      return responseMessage(
        res,
        200,
        [],
        "No existen actividades asociados a la meta"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
export async function consultarTareasActividadOrganizacion(
  req: Request,
  res: Response
) {
  try {
    let idActividad = req.params.idActividad;
    const lideres: any = await initModel.tarea.findAll({
      where: { Actividad_idActividad: idActividad, Estado_idEstado: 2 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idTarea);
      }
      return responseMessage(
        res,
        200,
        arrayLideres,
        "Proyecto asociado al líder"
      );
    } else {
      return responseMessage(
        res,
        200,
        [],
        "No existen actividades asociados a la meta"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
export async function consultarTareasActividadEjecucion(
  req: Request,
  res: Response
) {
  try {
    let idActividad = req.params.idActividad;
    const lideres: any = await initModel.tarea.findAll({
      where: { Actividad_idActividad: idActividad, Estado_idEstado: 3 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idTarea);
      }
      return responseMessage(
        res,
        200,
        arrayLideres,
        "Proyecto asociado al líder"
      );
    } else {
      return responseMessage(
        res,
        200,
        [],
        "No existen actividades asociados a la meta"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
export async function consultarTareasActividadCierre(
  req: Request,
  res: Response
) {
  try {
    let idActividad = req.params.idActividad;
    const lideres: any = await initModel.tarea.findAll({
      where: { Actividad_idActividad: idActividad, Estado_idEstado: 4 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idTarea);
      }
      return responseMessage(
        res,
        200,
        arrayLideres,
        "Proyecto asociado al líder"
      );
    } else {
      return responseMessage(
        res,
        200,
        [],
        "No existen actividades asociados a la meta"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarTareaInicio(req: Request, res: Response) {
  try {
    let idTarea = req.params.idTarea;
    if (idTarea) {
      let estado = { Estado_idEstado: 1 };
      let createPlannedExist = await initModel.tarea.update(estado, {
        where: { idTarea: idTarea },
      });
      if (createPlannedExist) {
        return responseMessage(
          res,
          200,
          createPlannedExist,
          "Tarea actualizada correctamente"
        );
      } else {
        return responseMessage(res, 400, false, "Error al actualizar la tarea");
      }
    } else {
      return responseMessage(
        res,
        404,
        false,
        "Error no esta ingresando el parametro requerido"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarTareaOrganizacion(req: Request, res: Response) {
  try {
    let idTarea = req.params.idTarea;
    if (idTarea) {
      let estado = { Estado_idEstado: 2 };
      let createPlannedExist = await initModel.tarea.update(estado, {
        where: { idTarea: idTarea },
      });
      if (createPlannedExist) {
        return responseMessage(
          res,
          200,
          createPlannedExist,
          "Tarea actualizada correctamente"
        );
      } else {
        return responseMessage(res, 400, false, "Error al actualizar la tarea");
      }
    } else {
      return responseMessage(
        res,
        404,
        false,
        "Error no esta ingresando el parametro requerido"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarTareaEjecucion(req: Request, res: Response) {
  try {
    let idTarea = req.params.idTarea;
    if (idTarea) {
      let estado = { Estado_idEstado: 3 };
      let createPlannedExist = await initModel.tarea.update(estado, {
        where: { idTarea: idTarea },
      });
      if (createPlannedExist) {
        return responseMessage(
          res,
          200,
          createPlannedExist,
          "Tarea actualizada correctamente"
        );
      } else {
        return responseMessage(res, 400, false, "Error al actualizar la tarea");
      }
    } else {
      return responseMessage(
        res,
        404,
        false,
        "Error no esta ingresando el parametro requerido"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarTareaCierre(req: Request, res: Response) {
  try {
    let idTarea = req.params.idTarea;
    if (idTarea) {
      let estado = { Estado_idEstado: 4 };
      let createPlannedExist = await initModel.tarea.update(estado, {
        where: { idTarea: idTarea },
      });
      if (createPlannedExist) {
        return responseMessage(
          res,
          200,
          createPlannedExist,
          "Tarea actualizada correctamente"
        );
      } else {
        return responseMessage(res, 400, false, "Error al actualizar la tarea");
      }
    } else {
      return responseMessage(
        res,
        404,
        false,
        "Error no esta ingresando el parametro requerido"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function totalPresupuestoTareaActividad(
  req: Request,
  res: Response
) {
  try {
    let presupuestoTotal = 0;
    let idActividad = req.params.idActividad;
    const tareas: any = await initModel.tarea.findAll({
      where: {
        Actividad_idActividad: idActividad,
      },
    });
    if (tareas.length > 0) {
      for (const tarea in tareas) {
        let presupuestoTarea = tareas[tarea].dataValues.presupuesto;
        presupuestoTotal = presupuestoTotal + presupuestoTarea;
      }
      return responseMessage(
        res,
        200,
        { presupuestoTotal: presupuestoTotal },
        "total de presuepuesto en tareas para esta actividad"
      );
    } else {
      return responseMessage(
        res,
        400,
        presupuestoTotal,
        "No existen tareas creados para esta actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}


export async function eliminarTarea(
  req: Request,
  res: Response
) {
  try {
    let idTarea= req.params.idTarea;
    await initModel.recurso.destroy({
      where: { Tarea_idTarea: idTarea},
    });

    const tarea: any = await initModel.tarea.findOne({
      where: {
        idTarea: idTarea,
      },
    });

    let idActividad = tarea.dataValues.Actividad_idActividad;
    let presuepuestoTarea = tarea.dataValues.presupuesto;
    let actividad = await initModel.actividad.findOne({
      where: { idActividad: idActividad },
    });
    let idMeta: any = actividad?.dataValues.Meta_idMeta;
    let presupuestoActividad: any = actividad?.dataValues.presupuesto;
    let presupuestoUpdateActividad = {
      presupuesto: parseFloat(presupuestoActividad) - parseFloat(presuepuestoTarea),
    };

    await initModel.actividad.update(presupuestoUpdateActividad, {
      where: { idActividad: idActividad },
    });

    let meta:any = await initModel.meta.findOne({
      where: { idMeta: idMeta },
    });

    let presuepuestoMeta = meta.dataValues.presupuesto;

    let presupuestoUpdateMeta = {
      presupuesto: parseFloat(presuepuestoMeta) - parseFloat(presuepuestoTarea),
    };

    await initModel.meta.update(presupuestoUpdateMeta,{
      where: { idMeta: idMeta },
    });

    let tareaDeleted = await initModel.tarea.destroy({
      where: { idTarea: idTarea},
    });
    if (tareaDeleted) {
      return responseMessage(
        res,
        200,
        tarea,
        "Se elimino la tarea exitosamente"
      );
    } else {
      return responseMessage(
        res,
        404,
        [],
        "Erro al eliminar la tarea"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}


export async function actualizarTarea(req: Request, res: Response) {
  try {
    req = req.body.data.task;
    const { idTarea }: any = req;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const { fechaInicio }: any = req;
    const { fechaFinal }: any = req;
    const { usuario }: any = req;
    let activityExist: any = await initModel.tarea.findOne({
      where: { nombre: nombre,  idTarea:  idTarea  },
    });
    if (activityExist) {
      let responsableExist = await initModel.responsable.findOne({
        where: { Usuario_idUsuario: usuario },
      });
      !responsableExist
        ? (responsableExist = await initModel.responsable.create({
            Usuario_idUsuario: usuario,
          }))
        : "";

      let idResponsable = responsableExist.dataValues.idResponsable;
      let task = {
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
        Responsable_idResponsable: idResponsable,
      };
      let findTask: any = await initModel.tarea.findOne({
        where: { idTarea: idTarea },
      });
      let nombreTarea = findTask.dataValues.nombre;
      let tareaPlaned = {
        nombre: nombre,
        descripcion: descripcion,
        //presupuesto: presupuesto,
        Responsable_idResponsable: idResponsable,
        fechaInicio: fechaInicio,
        FechaFinal: fechaFinal,
      };
      let updateActivityPlaned = await initModel.tareaplaneada.update(
        tareaPlaned,
        {
          where: { nombre: nombreTarea },
        }
      );
      let updateActivity = await initModel.tarea.update(task, {
        where: { idTarea: idTarea },
      });

      if (updateActivity) {
        return responseMessage(
          res,
          200,
          updateActivity,
          "tarea actualizada correctamente"
        );
      } else {
        return responseMessage(
          res,
          400,
          false,
          "Error al actualizar la tarea"
        );
      }
    } else {
      let activityExist: any = await initModel.tarea.findOne({
        where: { nombre: nombre,  idTarea:  { [Op.not]: idTarea }  },
      });
      if(activityExist)
        {
          return responseMessage(
            res,
            400,
            false,
            "ya existe una tarea con ese nombre"
          );
        }else{
          let responsableExist = await initModel.responsable.findOne({
            where: { Usuario_idUsuario: usuario },
          });
          !responsableExist
            ? (responsableExist = await initModel.responsable.create({
                Usuario_idUsuario: usuario,
              }))
            : "";
    
          let idResponsable = responsableExist.dataValues.idResponsable;
          let task = {
            nombre: nombre,
            descripcion: descripcion,
            presupuesto: presupuesto,
            Responsable_idResponsable: idResponsable,
          };
          let findTask: any = await initModel.tarea.findOne({
            where: { idTarea: idTarea },
          });
          let nombreTarea = findTask.dataValues.nombre;
          let tareaPlaned = {
            nombre: nombre,
            descripcion: descripcion,
            presupuesto: presupuesto,
            Responsable_idResponsable: idResponsable,
            fechaInicio: fechaInicio,
            FechaFinal: fechaFinal,
          };
          let updateActivityPlaned = await initModel.tareaplaneada.update(
            tareaPlaned,
            {
              where: { nombre: nombreTarea },
            }
          );
          let updateActivity = await initModel.tarea.update(task, {
            where: { idTarea: idTarea },
          });
    
          if (updateActivity) {
            return responseMessage(
              res,
              200,
              updateActivity,
              "tarea actualizada correctamente"
            );
          } else {
            return responseMessage(
              res,
              400,
              false,
              "Error al actualizar la tarea"
            );
          }
        }
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}


