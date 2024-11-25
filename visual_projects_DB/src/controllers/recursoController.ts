import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
import Sequelize, { Op } from "sequelize";

/**
 * @description Esta función consulta todos los recursos asociados a una actividad específica.
 * Utiliza el ID de la actividad proporcionado en los parámetros de la solicitud para buscar los recursos 
 * relacionados en la base de datos. Si se encuentran recursos, se devuelve la lista de recursos 
 * asociados a esa actividad; de lo contrario, se devuelve un mensaje indicando que la actividad 
 * no tiene recursos asignados.
 * 
 * @route GET /recurso-actividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idActividad` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si existen recursos asociados, se devuelve la lista de recursos.
 * - 404: Si no se encuentran recursos, se devuelve un mensaje indicando que la actividad no tiene recursos asignados.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function consultarRecursoActividad(req: Request, res: Response) {
  let idActividad = req.params.idActividad;
  try {
    const recurso: any = await initModel.recurso.findAll({
      where: { Actividad_idActividad: idActividad },
    });
    if (recurso.length > 0) {
      return responseMessage(
        res,
        200,
        recurso,
        "Recursos asociados a la actividad"
      );
    } else {
      return responseMessage(
        res,
        404,
        false,
        "la actividad aun no tiene recursos asignados"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función crea un nuevo recurso para una actividad específica.
 * Recibe los datos del recurso (nombre, descripción, presupuesto, idActividad , idMeta) desde el cuerpo de la solicitud.
 * Si no existe un recurso con el mismo nombre para la misma actividad, se crea un nuevo recurso y 
 * se actualizan los presupuestos de la actividad y la meta correspondiente.
 * Si el recurso ya existe, se devuelve un mensaje de error indicando que el recurso ya está asignado.
 * 
 * @route POST /crear-recurso-actividad
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los datos del recurso en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se crea correctamente, se devuelve el recurso creado.
 * - 400: Si ya existe un recurso con el mismo nombre para la actividad, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function crearRecursoActividad(req: Request, res: Response) {
  try {
    req = req.body.data.recurso;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const { idActividad }: any = req;
    const { idMeta }: any = req;

    const recursoExist: any = await initModel.recurso.findOne({
      where: { nombre: nombre, Actividad_idActividad: idActividad },
    });
    if (!recursoExist) {
      const recurso: any = await initModel.recurso.create({
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
        Actividad_idActividad: idActividad,
      });

      if (recurso) {
        let activity = await initModel.actividad.findOne({
          where: { idActividad: idActividad },
        });
        let presupuestoActivity: any = activity?.dataValues.presupuesto;
        let presupuestoUpdate = {
          presupuesto:
            parseFloat(presupuestoActivity) + parseFloat(presupuesto),
        };

        await initModel.actividad.update(presupuestoUpdate, {
          where: { idActividad: idActividad },
        });

        let meta = await initModel.meta.findOne({
          where: { idMeta: idMeta },
        });
        let presupuestoMeta: any = meta?.dataValues.presupuesto;
        let presupuestoUpdateMeta = {
          presupuesto: parseFloat(presupuestoMeta) + parseFloat(presupuesto),
        };

        await initModel.meta.update(presupuestoUpdateMeta, {
          where: { idMeta: idMeta },
        });

        return responseMessage(res, 200, recurso, "Recurso creado con exito");
      } else {
        return responseMessage(
          res,
          404,
          false,
          "la actividad aun no tiene recursos asignados"
        );
      }
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Ya existe un recurso con ese nombre asignado para esta actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función calcula el total del presupuesto asignado a los recursos de una actividad específica.
 * Utiliza el ID de la actividad proporcionado en los parámetros de la solicitud para obtener todos los recursos
 * asociados a esa actividad. Luego, suma los presupuestos de los recursos y devuelve el total.
 * Si no existen recursos asignados a la actividad, se devuelve un mensaje indicando que no hay recursos.
 * 
 * @route GET /total-presupuesto-recurso-actividad/:idActividad
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idActividad` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si existen recursos asociados, se devuelve el presupuesto total de los recursos.
 * - 400: Si no se encuentran recursos, se devuelve un mensaje indicando que no hay recursos creados para la actividad.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function totalPresupuestoRecursoActividad(
  req: Request,
  res: Response
) {
  try {
    let presupuestoTotal = 0;
    let idActividad = req.params.idActividad;
    const recursos: any = await initModel.recurso.findAll({
      where: {
        Actividad_idActividad: idActividad,
      },
    });

    if (recursos.length > 0) {
      for (const recurso in recursos) {
        let presupuestoRecurso = recursos[recurso].dataValues.presupuesto;
        presupuestoTotal = presupuestoTotal + presupuestoRecurso;
      }
      return responseMessage(
        res,
        200,
        { presupuestoTotal: presupuestoTotal },
        "total de presuepuesto en recursos para esta actividad"
      );
    } else {
      return responseMessage(
        res,
        400,
        presupuestoTotal,
        "No existen recursos creados para esta actividad"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función elimina un recurso de una actividad específica.
 * Recibe el ID del recurso a eliminar desde los parámetros de la solicitud. 
 * Primero verifica si el recurso existe, luego actualiza el presupuesto de la actividad
 * y de la meta relacionada, restando el presupuesto del recurso que será eliminado. 
 * Si la eliminación del recurso y la actualización de presupuestos es exitosa, 
 * se devuelve un mensaje de éxito. Si el recurso no se encuentra o no se puede eliminar, 
 * se devuelve un mensaje de error.
 * 
 * @route DELETE /eliminar-recurso-actividad/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idRecurso` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se elimina correctamente, se devuelve un mensaje de éxito.
 * - 400: Si el recurso no se encuentra o si ocurre un error en la eliminación, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function eliminarRecursoActividad(req: Request, res: Response) {
  try {
    let idRecurso: any = req.params.idRecurso;
    let recurso: any = await initModel.recurso.findOne({
      where: {
        idRecurso: idRecurso,
      },
    });
    if (recurso) {
      console.log("recursos", recurso);
      let idActividad = recurso.dataValues.Actividad_idActividad;

      let presuepuestoRecurso = recurso.dataValues.presupuesto;
      const actividad: any = await initModel.actividad.findOne({
        where: {
          idActividad: idActividad,
        },
      });
      let idMeta = actividad.dataValues.Meta_idMeta;
      let presupuestoActividad = actividad.dataValues.presupuesto;
      let presupuesTotal = {
        presupuesto:
          parseFloat(presupuestoActividad) - parseFloat(presuepuestoRecurso),
      };
      await initModel.actividad.update(
        presupuesTotal,
        {
          where: {
            idActividad: idActividad,
          },
        }
      );

      let meta = await initModel.meta.findOne({
        where: { idMeta: idMeta },
      });
      let presupuestoMeta: any = meta?.dataValues.presupuesto;
      let presupuestoUpdateMeta = {
        presupuesto:
          parseFloat(presupuestoMeta) - parseFloat(presuepuestoRecurso),
      };

      await initModel.meta.update(presupuestoUpdateMeta, {
        where: { idMeta: idMeta },
      });

      const recursos: any = await initModel.recurso.destroy({
        where: {
          idRecurso: idRecurso,
        },
      });
      if (recursos) {
        return responseMessage(
          res,
          200,
          recursos,
          "Recurso eliminado con exito"
        );
      } else {
        return responseMessage(
          res,
          400,
          false,
          "Error no se elimino este recurso"
        );
      }
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error no se encontro el recurso"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}
/**
 * @description Esta función actualiza un recurso asociado a una actividad específica.
 * Recibe los detalles del recurso a actualizar desde el cuerpo de la solicitud. 
 * Primero verifica si el recurso ya existe en la actividad, y si es así, actualiza su presupuesto 
 * en la actividad y la meta asociada. Si el recurso no existe, se verifica que no haya otro recurso 
 * con el mismo nombre en otra actividad. En caso de éxito, se devuelve un mensaje con los datos del recurso actualizado. 
 * Si ocurre algún error, se devuelve un mensaje de error.
 * 
 * @route PUT /actualizar-recurso-actividad/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los detalles del recurso en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se actualiza correctamente, se devuelve un mensaje de éxito con los detalles del recurso actualizado.
 * - 400: Si ya existe un recurso con el mismo nombre en otra actividad o si el recurso no se encuentra, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function actualizarRecursoActividad(req: Request, res: Response) {
  try {
    req = req.body.data.recurso;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const { idActividad }: any = req;
    const { idRecurso }: any = req;
    const { presupuestoMeta }: any = req;
    const { idMeta }: any = req;

    const recursoExist: any = await initModel.recurso.findOne({
      where: { Actividad_idActividad: idActividad },
    });
    if (recursoExist) {
      let presupuestoTotal: any = 0;
      let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
      let activity = await initModel.actividad.findOne({
        where: { idActividad: idActividad },
      });
      let presupuestoActivity: any = activity?.dataValues.presupuesto;
      presupuestoTotal =
        parseFloat(presupuestoActivity) - parseFloat(presupuestoRecurso);

      let recurso = {
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
      };
      await initModel.recurso.update(recurso, {
        where: { idRecurso: idRecurso },
      });

      presupuestoTotal = parseFloat(presupuestoTotal) + parseFloat(presupuesto);

      let presupuestoUpdate = {
        presupuesto: presupuestoTotal,
      };

      await initModel.actividad.update(presupuestoUpdate, {
        where: { idActividad: idActividad },
      });
      /********************************************************************* */
      let presupuestoTotalMeta: any =
        parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
      presupuestoTotalMeta =
        parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);

      let presupuestoMetaUpdate = {
        presupuesto: presupuestoTotalMeta,
      };

      await initModel.meta.update(presupuestoMetaUpdate, {
        where: { idMeta: idMeta },
      });

      return responseMessage(res, 200, recurso, "Recurso creado con exito");
    } else {
      const recursoExist: any = await initModel.recurso.findOne({
        where: {
          nombre: nombre,
          Actividad_idActividad: { [Op.not]: idActividad },
        },
      });
      if (recursoExist) {
        return responseMessage(
          res,
          400,
          false,
          "ya existe un recurso con ese nombre"
        );
      } else {
        let presupuestoTotal: any = 0;
        let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
        let activity = await initModel.actividad.findOne({
          where: { idActividad: idActividad },
        });
        let presupuestoActivity: any = activity?.dataValues.presupuesto;
        presupuestoTotal =
          parseFloat(presupuestoActivity) - parseFloat(presupuestoRecurso);

        let recurso = {
          nombre: nombre,
          descripcion: descripcion,
          presupuesto: presupuesto,
        };
        await initModel.recurso.update(recurso, {
          where: { idRecurso: idRecurso },
        });

        presupuestoTotal =
          parseFloat(presupuestoTotal) + parseFloat(presupuesto);

        let presupuestoUpdate = {
          presupuesto: presupuestoTotal,
        };

        await initModel.actividad.update(presupuestoUpdate, {
          where: { idActividad: idActividad },
        });

        let presupuestoTotalMeta: any =
          parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
        console.log("soy el presupuestoMeta", presupuestoTotalMeta);
        presupuestoTotalMeta =
          parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);

        let presupuestoMetaUpdate = {
          presupuesto: presupuestoTotalMeta,
        };

        await initModel.meta.update(presupuestoMetaUpdate, {
          where: { idMeta: idMeta },
        });

        return responseMessage(res, 200, recurso, "Recurso creado con exito");
      }
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función consulta los recursos asociados a una tarea específica.
 * Recibe el ID de la tarea desde los parámetros de la solicitud. Si la tarea tiene recursos asociados,
 * devuelve una lista de esos recursos. Si no existen recursos para la tarea, devuelve un mensaje indicando 
 * que no hay recursos asignados. Si ocurre algún error, se devuelve un mensaje de error.
 * 
 * @route GET /consultar-recurso-tarea/:idTarea
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si se encuentran recursos asociados a la tarea, se devuelve una lista de los recursos.
 * - 404: Si no se encuentran recursos asociados a la tarea, se devuelve un mensaje indicando que no hay recursos asignados.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function consultarRecursoTarea(req: Request, res: Response) {
  let idTarea = req.params.idTarea;
  try {
    const recurso: any = await initModel.recurso.findAll({
      where: { Tarea_idTarea: idTarea },
    });

    if (recurso.length > 0) {
      return responseMessage(
        res,
        200,
        recurso,
        "Recursos asociados a la tarea"
      );
    } else {
      return responseMessage(
        res,
        404,
        false,
        "la tarea aun no tiene recursos asignados"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función crea un nuevo recurso asociado a una tarea específica. 
 * Verifica si ya existe un recurso con el mismo nombre en la tarea antes de proceder con su creación. 
 * Si el recurso no existe, lo crea y actualiza los presupuestos de la tarea, actividad y meta relacionadas, 
 * sumando el presupuesto del nuevo recurso a los presupuestos existentes. 
 * Si el recurso ya existe, devuelve un mensaje de error.
 * 
 * @route POST /crear-recurso-tarea
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene los detalles del recurso a crear en el cuerpo de la solicitud.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se crea correctamente, se devuelve un mensaje de éxito con los datos del nuevo recurso.
 * - 400: Si ya existe un recurso con el mismo nombre en la tarea, se devuelve un mensaje de error.
 * - 404: Si no se encuentra la tarea o algún otro recurso necesario para la creación, se devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function crearRecursoTarea(req: Request, res: Response) {
  try {
    req = req.body.data.recurso;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const { idTarea }: any = req;
    const { presupuestoActividad }: any = req;
    const { idActividad }: any = req;
    const { presupuestoMeta }: any = req;
    const { idMeta }: any = req;

    const recursoExist: any = await initModel.recurso.findOne({
      where: { nombre: nombre, Tarea_idTarea: idTarea },
    });
    if (!recursoExist) {
      const recurso: any = await initModel.recurso.create({
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
        Tarea_idTarea: idTarea,
      });

      if (recurso) {
        let task = await initModel.tarea.findOne({
          where: { idTarea: idTarea },
        });
        let presupuestoActivity: any = task?.dataValues.presupuesto;
        let presupuestoUpdate = {
          presupuesto:
            parseFloat(presupuestoActivity) + parseFloat(presupuesto),
        };

        await initModel.tarea.update(presupuestoUpdate, {
          where: { idTarea: idTarea },
        });

        let totalPresupuestoActividad = {presupuesto:parseFloat(presupuestoActividad)+ parseFloat(presupuesto)}
        await initModel.actividad.update(totalPresupuestoActividad, {
          where: { idActividad: idActividad },
        });

        let meta = await initModel.meta.findOne({
          where: { idMeta: idMeta },
        });
        let presupuestoMeta: any = meta?.dataValues.presupuesto;
        let presupuestoUpdateMeta = {
          presupuesto: parseFloat(presupuestoMeta) + parseFloat(presupuesto),
        };

        await initModel.meta.update(presupuestoUpdateMeta, {
          where: { idMeta: idMeta },
        });
        return responseMessage(res, 200, recurso, "Recurso creado con exito");
      } else {
        return responseMessage(
          res,
          404,
          false,
          "la tarea aun no tiene recursos asignados"
        );
      }
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Ya existe un recurso con ese nombre asignado para esta tarea"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función calcula el total del presupuesto de todos los recursos asociados a una tarea específica.
 * Recibe el ID de la tarea desde los parámetros de la solicitud y obtiene todos los recursos asociados. 
 * Luego, suma los presupuestos de esos recursos para obtener el total. 
 * Si no se encuentran recursos asociados a la tarea, se devuelve un mensaje indicando que no existen recursos.
 * Si ocurre un error en el servidor, se devuelve un mensaje de error.
 * 
 * @route GET /total-presupuesto-recurso-tarea/:idTarea
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idTarea` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si se encuentran recursos asociados a la tarea, se devuelve el total del presupuesto de esos recursos.
 * - 400: Si no se encuentran recursos para la tarea, se devuelve un mensaje indicando que no existen recursos.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function totalPresupuestoRecursoTarea(
  req: Request,
  res: Response
) {
  try {
    let presupuestoTotal = 0;
    let idTarea = req.params.idTarea;
    const recursos: any = await initModel.recurso.findAll({
      where: {
        Tarea_idTarea: idTarea,
      },
    });

    if (recursos.length > 0) {
      for (const recurso in recursos) {
        let presupuestoRecurso = recursos[recurso].dataValues.presupuesto;
        presupuestoTotal = presupuestoTotal + presupuestoRecurso;
      }
      return responseMessage(
        res,
        200,
        { presupuestoTotal: presupuestoTotal },
        "total de presuepuesto en recursos para esta tarea"
      );
    } else {
      return responseMessage(
        res,
        400,
        presupuestoTotal,
        "No existen recursos creados para esta tarea"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función elimina un recurso asociado a una tarea, y ajusta los presupuestos en la tarea, 
 * la actividad y la meta correspondientes. Si la eliminación es exitosa, devuelve un mensaje indicando el éxito, 
 * junto con el número de recursos eliminados. Si hay algún error, devuelve un mensaje de error.
 * 
 * @route DELETE /eliminar-recurso/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idRecurso` en la URL.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se elimina exitosamente, devuelve un mensaje de éxito.
 * - 400: Si el recurso no se encuentra en la base de datos, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function eliminarRecursoTarea(req: Request, res: Response) {
  try {
    let idRecurso: any = req.params.idRecurso;
    let recurso: any = await initModel.recurso.findOne({
      where: {
        idRecurso: idRecurso,
      },
    });
    if (recurso) {
     
      let idTarea = recurso.dataValues.Tarea_idTarea;
      let presuepuestoRecurso = recurso.dataValues.presupuesto;
      let tarea:any= await initModel.tarea.findOne({
        where: {
          idTarea: idTarea,
        },
      });

      // ACTUALIZA LA TAREA
      let tareaPresupuesto = tarea.dataValues.presupuesto
      let presupuesTotalTarea = {
        presupuesto:
          parseFloat(tareaPresupuesto) - parseFloat(presuepuestoRecurso),
      };

      await initModel.tarea.update(
        presupuesTotalTarea,
        {
          where: {
            idTarea: idTarea,
          },
        }
      );

      // ACTUALIZA LA ACTIVIDAD
      let idActividad = tarea.dataValues.Actividad_idActividad
      let actividad:any= await initModel.actividad.findOne({
        where: {
          idActividad: idActividad,
        },
      });
      let idMeta = actividad.dataValues.Meta_idMeta;
      let presupuestoActividad = actividad.dataValues.presupuesto;
      let presupuesTotal = {
        presupuesto:
          parseFloat(presupuestoActividad) - parseFloat(presuepuestoRecurso),
      };
      const updateActividad: any = await initModel.actividad.update(
        presupuesTotal,
        {
          where: {
            idActividad: idActividad,
          },
        }
      );

     // ACTUALIZA LA META
      let meta = await initModel.meta.findOne({
        where: { idMeta: idMeta },
      });
      let presupuestoMeta: any = meta?.dataValues.presupuesto;
      let presupuestoUpdateMeta = {
        presupuesto:
          parseFloat(presupuestoMeta) - parseFloat(presuepuestoRecurso),
      };

      await initModel.meta.update(presupuestoUpdateMeta, {
        where: { idMeta: idMeta },
      });

      const recursos: any = await initModel.recurso.destroy({
        where: {
          idRecurso: idRecurso,
        },
      });

      if (recursos) {
        return responseMessage(
          res,
          200,
          recursos,
          "Recurso eliminado con exito"
        );
      } else {
        return responseMessage(
          res,
          400,
          false,
          "Error no se elimino este recurso"
        );
      }
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error no se encontro el recurso"
      );
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}

/**
 * @description Esta función actualiza un recurso asociado a una tarea. Ajusta el presupuesto en la tarea, actividad 
 * y meta según las diferencias entre el presupuesto anterior y el nuevo. Si el recurso no existe, se verifica si existe 
 * otro recurso con el mismo nombre en una tarea distinta, y si no se encuentra, se crea un nuevo recurso.
 * 
 * @route PUT /actualizar-recurso/:idRecurso
 * @param {Request} req - El objeto de la solicitud HTTP. Contiene el parámetro `idRecurso` en la URL y el cuerpo de la solicitud con los datos actualizados del recurso.
 * @param {Response} res - El objeto de la respuesta HTTP.
 * @returns {Response} - Devuelve una respuesta con el código HTTP correspondiente:
 * - 200: Si el recurso se actualiza exitosamente, devuelve un mensaje con los detalles del recurso actualizado.
 * - 400: Si no se puede actualizar el recurso o el recurso no se encuentra en otra tarea, devuelve un mensaje de error.
 * - 503: Si ocurre un error en el servidor, devuelve un mensaje con el error.
 */
export async function actualizarRecursoTarea(req: Request, res: Response) {
  try {
    req = req.body.data.recurso;
    const { nombre }: any = req;
    const { descripcion }: any = req;
    const { presupuesto }: any = req;
    const { idTarea }: any = req;
    const { idRecurso }: any = req;
    const { presupuestoMeta }: any = req;
    const { idMeta }: any = req;
    const { idActividad }: any = req;
    const recursoExist: any = await initModel.recurso.findOne({
      where: {Tarea_idTarea: idTarea },
    });
    if (recursoExist) {
      let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
      let tarea = await initModel.tarea.findOne({
        where: { idTarea: idTarea },
      });
      let presupuestoTarea: any = tarea?.dataValues.presupuesto;
      let presupuestoTotalTarea :any =
        parseFloat(presupuestoTarea) - parseFloat(presupuestoRecurso);
      presupuestoTotalTarea = parseFloat(presupuestoTotalTarea) + parseFloat(presupuesto);
      let presupuestoTareaUpdate = {
        presupuesto: presupuestoTotalTarea,
      };

      await initModel.tarea.update(presupuestoTareaUpdate, {
        where: { idTarea: idTarea },
      });
      /********************************************************************* */
      let actividad = await initModel.actividad.findOne({
        where: { idActividad: idActividad },
      });
      let presupuestoActividad: any = actividad?.dataValues.presupuesto;
      let presupuestoTotalActividad :any =
        parseFloat(presupuestoActividad) - parseFloat(presupuestoRecurso);
        presupuestoTotalActividad = parseFloat(presupuestoTotalActividad) + parseFloat(presupuesto);

      let presupuestoActividadUpdate = {
        presupuesto: presupuestoTotalActividad,
      };

      await initModel.actividad.update(presupuestoActividadUpdate, {
        where: { idActividad: idActividad },
      });

      /********************************************************************* */
      let presupuestoTotalMeta: any =
        parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
      presupuestoTotalMeta =
        parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);

      let presupuestoMetaUpdate = {
        presupuesto: presupuestoTotalMeta,
      };

      await initModel.meta.update(presupuestoMetaUpdate, {
        where: { idMeta: idMeta },
      });
      let recurso = {
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
      };
      await initModel.recurso.update(recurso, {
        where: { idRecurso: idRecurso },
      });
      return responseMessage(res, 200, recurso, "Recurso creado con exito");
    } else {
      const recursoExist: any = await initModel.recurso.findOne({
        where: {
          nombre: nombre,
          Tarea_idTarea: { [Op.not]: idTarea },
        },
      });
      if (recursoExist) {
        return responseMessage(
          res,
          400,
          false,
          "ya existe un recurso con ese nombre"
        );
      } else {
          let presupuestoRecurso = recursoExist?.dataValues.presupuesto;
          let presupuestoTotalTarea: any = 0;
          let tarea = await initModel.tarea.findOne({
            where: { idTarea: idTarea },
          });
          let presupuestoTarea: any = tarea?.dataValues.presupuesto;
          presupuestoTotalTarea =
            parseFloat(presupuestoTarea) - parseFloat(presupuestoRecurso);
          presupuestoTotalTarea = parseFloat(presupuestoTotalTarea) + parseFloat(presupuesto);

          let presupuestoTareaUpdate = {
            presupuesto: presupuestoTotalTarea,
          };

      await initModel.tarea.update(presupuestoTareaUpdate, {
        where: { idTarea: idTarea },
      });
      /********************************************************************* */
      let presupuestoTotalActividad: any = 0;
      let actividad = await initModel.actividad.findOne({
        where: { idActividad: idActividad },
      });
      let presupuestoActividad: any = tarea?.dataValues.presupuesto;
      presupuestoTotalActividad =
        parseFloat(presupuestoActividad) - parseFloat(presupuestoRecurso);
        presupuestoTotalActividad = parseFloat(presupuestoTotalTarea) + parseFloat(presupuesto);

      let presupuestoActividadUpdate = {
        presupuesto: presupuestoTotalActividad,
      };

      await initModel.actividad.update(presupuestoActividadUpdate, {
        where: { idActividad: idActividad },
      });
      
      /********************************************************************* */
      let presupuestoTotalMeta: any =
        parseFloat(presupuestoMeta) - parseFloat(presupuestoRecurso);
      presupuestoTotalMeta =
        parseFloat(presupuestoTotalMeta) + parseFloat(presupuesto);

      let presupuestoMetaUpdate = {
        presupuesto: presupuestoTotalMeta,
      };

      await initModel.meta.update(presupuestoMetaUpdate, {
        where: { idMeta: idMeta },
      });
      let recurso = {
        nombre: nombre,
        descripcion: descripcion,
        presupuesto: presupuesto,
      };
      await initModel.recurso.update(recurso, {
        where: { idRecurso: idRecurso },
      });
      return responseMessage(res, 200, recurso, "Recurso creado con exito");
      }
    }
  } catch (error) {
    return responseMessage(res, 503, error, "error server ...");
  }
}