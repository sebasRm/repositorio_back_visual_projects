import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
import { responseMessage } from "../helpers/utils";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";
import {
  findActivitiesFinish,
  findActivitiesInitial,
  findActivitiesOrganization,
  findActivitiesEjecution,
  findTotalActivities,
} from "../services/findActivities";

import {
  findTaskFinish,
  findTaskInitial,
  findTaskOrganization,
  findTaskEjecution,
  findTaskInitialActivity,
  findTaskOrganizationActivity,
  findTaskEjecutionActivity,
  findTaskFinishActivity,
} from "../services/findTask";

/**
 * Funcion para contar el total de las activiades asociadas a un cronograma del proyecto.
 */
export async function contarTotalActividades(req: Request, res: Response) {
  req = req.body.data.activity;
  const { idCronograma }: any = req;
  try {
    if (idCronograma) {
      let activitiesTotal = await findTotalActivities(idCronograma);
      return responseMessage(
        res,
        200,
        activitiesTotal,
        "Total de las activiades asociadas a un cronograma del proyecto"
      );
    } else {
      return responseMessage(res, 200, 0, "el id esta en null");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * Funcion para contat el total de las activiades finalizadas asociadas a un cronograma del proyecto.
 */
export async function contarActividadesFinalizadas(
  req: Request,
  res: Response
) {
  req = req.body.data.activity;
  const { idCronograma }: any = req;
  try {
    if (idCronograma) {
      const contadorActividad: any = await findActivitiesFinish(idCronograma);
      console.log("soy el contadorActividad", contadorActividad);
      if (contadorActividad) {
        return responseMessage(
          res,
          200,
          [{ contadorActividad: contadorActividad.contadorActividad }],
          "Total de las activiades finalizadas asociadas a un cronograma del proyecto."
        );
      } else {
        return responseMessage(
          res,
          200,
          [{ contadorActividad: 0 }],
          "Total de las activiades finalizadas asociadas a un cronograma del proyecto."
        );
      }
    } else {
      return responseMessage(
        res,
        200,
        [{ contadorActividad: 0 }],
        "Total de las activiades finalizadas asociadas a un cronograma del proyecto."
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function contarActividadesActivas(req: Request, res: Response) {
  req = req.body.data.activity;
  const { idCronograma }: any = req;
  try {
    if (idCronograma) {
      const contadorActividad: any = await findActivitiesInitial(idCronograma);

      if (contadorActividad) {
        return responseMessage(
          res,
          200,
          [{ contadorActividad: contadorActividad.contadorActividad }],
          "Total de las activiades Activas asociadas a un cronograma del proyecto."
        );
      }
    } else {
      return responseMessage(
        res,
        200,
        [{ contadorActividad: 0 }],
        "Total de las activiades Activas asociadas a un cronograma del proyecto."
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Funcion para crear el porcetaje de las actividades donde el estado esta en cierre o 4
*/
export async function porcentajeActividadesTermidas(
  req: Request,
  res: Response
) {
  try {
    req = req.body.data.activity;
    const { idCronograma }: any = req;
    if (idCronograma !== null) {
      let actividadesActivas = await findActivitiesInitial(idCronograma);

      let actividadesOrganization = await findActivitiesOrganization(
        idCronograma
      );
      console.log("actividadesActivas", actividadesOrganization);
      let actividadesEjecution = await findActivitiesEjecution(idCronograma);
      let actividadesFinish = await findActivitiesFinish(idCronograma);
      let noActivity
      if (
        actividadesActivas == 0 &&
        actividadesOrganization == 0 &&
        actividadesEjecution == 0 &&
        actividadesFinish == 0
      ) {
        noActivity = 0.0001;
      }
      return responseMessage(
        res,
        200,
        [
          actividadesActivas,
          actividadesOrganization,
          actividadesEjecution,
          actividadesFinish,
          noActivity
        ],
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

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function consultarActividadesMeta(req: Request, res: Response) {
  try {
    let idMeta = req.params.idMeta;
    const actividades: any = await initModel.actividad.findAll({
      where: { Meta_idMeta: idMeta },

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
        {
          model: initModel.tarea,
          as: "tareas",
          attributes: [],
        },
      ],
    });
    // Iterar sobre las actividades para contar el número de tareas asociadas a cada una
    const actividadesConTareas = await Promise.all(
      actividades.map(async (actividad: any) => {
        const contadorTareas = await initModel.tarea.count({
          where: { Actividad_idActividad: actividad.idActividad },
        });
        // Agregar el contador de tareas como un atributo adicional a la actividad
        return {
          ...actividad.toJSON(), // Convertir la actividad a objeto plano
          contadorTareas,
        };
      })
    );
    if (actividadesConTareas.length > 0) {
      return responseMessage(
        res,
        200,
        actividadesConTareas,
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
export async function crearActividad(req: Request, res: Response) {
  try {
    req = req.body.data.activity;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const { fechaInicio }: any = req;
    const { fechaFinal }: any = req;
    const { usuario }: any = req;
    const { meta }: any = req;
    const { cronograma }: any = req;

    let createPlannedExist = await initModel.actividadplaneada.findOne({
      where: { nombre: nombre },
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
      let createPlannedActivity = await initModel.actividadplaneada.create({
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
        fechaInicio: fechaInicio,
        FechaFinal: fechaFinal,
        Estado_idEstado: 1,
        Meta_idMeta: meta,
        Responsable_idResponsable: idResponsable,
        cronogramaOriginal: cronograma,
      });
      if (createPlannedActivity) {
        let createActivity = await initModel.actividad.create({
          nombre: nombre,
          descripcion: descripcion,
          presupuesto: 0,
          Estado_idEstado: 1,
          Meta_idMeta: meta,
          Responsable_idResponsable: idResponsable,
        });
        if (createActivity) {
          return responseMessage(
            res,
            200,
            createActivity,
            "Actividad creada con exito"
          );
        } else {
          return responseMessage(
            res,
            400,
            false,
            "Error al crear la actividad"
          );
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
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta cuyo estado sea inicio
*/
export async function consultarActividadesMetaInicio(
  req: Request,
  res: Response
) {
  try {
    let idMeta = req.params.idMeta;
    const lideres: any = await initModel.actividad.findAll({
      where: { Meta_idMeta: idMeta, Estado_idEstado: 1 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idActividad);
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
export async function consultarActividadesMetaOrganizacion(
  req: Request,
  res: Response
) {
  try {
    let idMeta = req.params.idMeta;
    const lideres: any = await initModel.actividad.findAll({
      where: { Meta_idMeta: idMeta, Estado_idEstado: 2 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idActividad);
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

export async function consultarActividadesMetaEjecucion(
  req: Request,
  res: Response
) {
  try {
    let idMeta = req.params.idMeta;
    const lideres: any = await initModel.actividad.findAll({
      where: { Meta_idMeta: idMeta, Estado_idEstado: 3 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idActividad);
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

export async function consultarActividadesMetaCierre(
  req: Request,
  res: Response
) {
  try {
    let idMeta = req.params.idMeta;
    const lideres: any = await initModel.actividad.findAll({
      where: { Meta_idMeta: idMeta, Estado_idEstado: 4 },
    });
    if (lideres.length > 0) {
      let arrayLideres: any = [];
      for (let lider in lideres) {
        arrayLideres.push(lideres[lider].dataValues.idActividad);
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
export async function actualizarActividadOrganizacion(
  req: Request,
  res: Response
) {
  try {
    let idActividad = req.params.idActividad;
    let estado = { Estado_idEstado: 2 };
    let createPlannedExist = await initModel.actividad.update(estado, {
      where: { idActividad: idActividad },
    });
    if (createPlannedExist) {
      return responseMessage(
        res,
        200,
        createPlannedExist,
        "Actividad actualizada correctamente"
      );
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error al actualizar la actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarActividadInicio(req: Request, res: Response) {
  try {
    let idActividad = req.params.idActividad;
    let estado = { Estado_idEstado: 1 };
    let createPlannedExist = await initModel.actividad.update(estado, {
      where: { idActividad: idActividad },
    });
    if (createPlannedExist) {
      return responseMessage(
        res,
        200,
        createPlannedExist,
        "Actividad actualizada correctamente"
      );
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error al actualizar la actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarActividadEjecucion(
  req: Request,
  res: Response
) {
  try {
    let idActividad = req.params.idActividad;
    let estado = { Estado_idEstado: 3 };
    let createPlannedExist = await initModel.actividad.update(estado, {
      where: { idActividad: idActividad },
    });
    if (createPlannedExist) {
      return responseMessage(
        res,
        200,
        createPlannedExist,
        "Actividad actualizada correctamente"
      );
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error al actualizar la actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarActividadCierre(req: Request, res: Response) {
  try {
    let idActividad = req.params.idActividad;
    let estado = { Estado_idEstado: 4 };
    let createPlannedExist = await initModel.actividad.update(estado, {
      where: { idActividad: idActividad },
    });
    if (createPlannedExist) {
      return responseMessage(
        res,
        200,
        createPlannedExist,
        "Actividad actualizada correctamente"
      );
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error al actualizar la actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/*
   => Función para consultar las actividades asociadas a una meta
*/
export async function actualizarActividad(req: Request, res: Response) {
  try {
    req = req.body.data.activity;
    const { idActividad }: any = req;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const { fechaInicio }: any = req;
    const { fechaFinal }: any = req;
    const { usuario }: any = req;
    let activityExist: any = await initModel.actividad.findOne({
      where: { nombre: nombre, idActividad: idActividad },
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
      let activity = {
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
        Responsable_idResponsable: idResponsable,
      };
      let findActivity: any = await initModel.actividad.findOne({
        where: { idActividad: idActividad },
      });
      let nombreActividad = findActivity.dataValues.nombre;
      let activityPlaned = {
        nombre: nombre,
        descripcion: descripcion,
        Responsable_idResponsable: idResponsable,
        fechaInicio: fechaInicio,
        FechaFinal: fechaFinal,
      };
      let updateActivityPlaned = await initModel.actividadplaneada.update(
        activityPlaned,
        {
          where: { nombre: nombreActividad },
        }
      );
      let updateActivity = await initModel.actividad.update(activity, {
        where: { idActividad: idActividad },
      });

      if (updateActivity) {
        return responseMessage(
          res,
          200,
          updateActivity,
          "Actividad actualizada correctamente"
        );
      } else {
        return responseMessage(
          res,
          400,
          false,
          "Error al actualizar la actividad"
        );
      }
    } else {
      let activityExist: any = await initModel.actividad.findOne({
        where: { nombre: nombre, idActividad: { [Op.not]: idActividad } },
      });
      if (activityExist) {
        return responseMessage(
          res,
          400,
          false,
          "ya existe una actividad con ese nombre"
        );
      } else {
        let responsableExist = await initModel.responsable.findOne({
          where: { Usuario_idUsuario: usuario },
        });
        !responsableExist
          ? (responsableExist = await initModel.responsable.create({
              Usuario_idUsuario: usuario,
            }))
          : "";

        let idResponsable = responsableExist.dataValues.idResponsable;
        let activity = {
          nombre: nombre,
          descripcion: descripcion,
          presupuesto: presupuesto,
          Responsable_idResponsable: idResponsable,
        };
        let findActivity: any = await initModel.actividad.findOne({
          where: { idActividad: idActividad },
        });
        let nombreActividad = findActivity.dataValues.nombre;
        let activityPlaned = {
          nombre: nombre,
          descripcion: descripcion,
          Responsable_idResponsable: idResponsable,
          fechaInicio: fechaInicio,
          FechaFinal: fechaFinal,
        };
        let updateActivityPlaned = await initModel.actividadplaneada.update(
          activityPlaned,
          {
            where: { nombre: nombreActividad },
          }
        );
        let updateActivity = await initModel.actividad.update(activity, {
          where: { idActividad: idActividad },
        });

        if (updateActivity) {
          return responseMessage(
            res,
            200,
            updateActivity,
            "Actividad actualizada correctamente"
          );
        } else {
          return responseMessage(
            res,
            400,
            false,
            "Error al actualizar la actividad"
          );
        }
      }
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function consultarRecursosActividad(req: Request, res: Response) {
  try {
    let idActividad = req.params.idActividad;
    const recursos: any = await initModel.recurso.findAll({
      where: { Actividad_idActividad: idActividad },
    });
    if (recursos.length > 0) {
      return responseMessage(res, 200, recursos, "Proyecto asociado al líder");
    } else {
      return responseMessage(
        res,
        404,
        [],
        "No existen recursos asociados a la actividades"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function consultarPresupuestoActividad(
  req: Request,
  res: Response
) {
  try {
    let idActividad = req.params.idActividad;
    const actividad: any = await initModel.actividad.findOne({
      where: { idActividad: idActividad },
    });
    if (actividad) {
      return responseMessage(res, 200, actividad, "Proyecto asociado al líder");
    } else {
      return responseMessage(res, 404, [], "Erro al consultar la actividad");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function eliminarActividad(req: Request, res: Response) {
  try {
    let idActividad = req.params.idActividad;
    await initModel.recurso.destroy({
      where: { Actividad_idActividad: idActividad },
    });

    let tareas = await initModel.tarea.findAll({
      where: { Actividad_idActividad: idActividad },
    });

    if (tareas.length > 0) {
      for (const tarea in tareas) {
        let idTarea = tareas[tarea].dataValues.idTarea;
        await initModel.recurso.destroy({
          where: { Tarea_idTarea: idTarea },
        });
      }
    }

    await initModel.tarea.destroy({
      where: { Actividad_idActividad: idActividad },
    });

    const actividad: any = await initModel.actividad.findOne({
      where: {
        idActividad: idActividad,
      },
    });
    let idMeta = actividad.dataValues.Meta_idMeta;
    let presuepuestoActividad = actividad.dataValues.presupuesto;
    let meta = await initModel.meta.findOne({
      where: { idMeta: idMeta },
    });
    let presupuestoMeta: any = meta?.dataValues.presupuesto;
    let presupuestoUpdateMeta = {
      presupuesto:
        parseFloat(presupuestoMeta) - parseFloat(presuepuestoActividad),
    };

    await initModel.meta.update(presupuestoUpdateMeta, {
      where: { idMeta: idMeta },
    });

    let actividadDeleted = await initModel.actividad.destroy({
      where: { idActividad: idActividad },
    });
    if (actividadDeleted) {
      return responseMessage(
        res,
        200,
        actividad,
        "Se elimino la actividad exitosamente"
      );
    } else {
      return responseMessage(res, 404, [], "Erro al eliminar la actividad");
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

export async function actualizarActividadEstado(req: Request, res: Response) {
  try {
    req = req.body.data.activity;
    const { idActividad }: any = req;
    if (idActividad !== null) {
      let tareasInitial = await findTaskInitialActivity(idActividad);
      let tareasOrganization = await findTaskOrganizationActivity(idActividad);
      let tareasEjecution = await findTaskEjecutionActivity(idActividad);
      let tareasFinish = await findTaskFinishActivity(idActividad);

      if (
        tareasInitial == 0 &&
        tareasOrganization == 0 &&
        tareasEjecution == 0 &&
        tareasFinish == 0
      ) {
        let estadoActividad = {
          Estado_idEstado: 1,
        };
        const actividad: any = await initModel.actividad.update(
          estadoActividad,
          {
            where: {
              idActividad: idActividad,
            },
          }
        );
      } else {
        const maxTarea = Math.max(
          tareasInitial,
          tareasOrganization,
          tareasEjecution,
          tareasFinish
        );
        // Determina cuál variable tiene el valor máximo
        let tareaMaxima: any;
        if (maxTarea === tareasInitial) {
          tareaMaxima = 1;
        } else if (maxTarea === tareasOrganization) {
          tareaMaxima = 2;
        } else if (maxTarea === tareasEjecution) {
          tareaMaxima = 3;
        } else if (maxTarea === tareasFinish) {
          const maxTarea = Math.max(
            tareasInitial,
            tareasOrganization,
            tareasEjecution
          );
          if (maxTarea !== 0) {
            if (maxTarea === tareasInitial) {
              tareaMaxima = 1;
            } else if (maxTarea === tareasOrganization) {
              tareaMaxima = 2;
            } else if (maxTarea === tareasEjecution) {
              tareaMaxima = 3;
            }
          } else {
            tareaMaxima = 4;
          }
        }
        let estadoActividad = {
          Estado_idEstado: tareaMaxima,
        };
        const actividad: any = await initModel.actividad.update(
          estadoActividad,
          {
            where: {
              idActividad: idActividad,
            },
          }
        );
      }
      return responseMessage(
        res,
        200,
        [tareasInitial, tareasOrganization, tareasEjecution, tareasFinish],
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
