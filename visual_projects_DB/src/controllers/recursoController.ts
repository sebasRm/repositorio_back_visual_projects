import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conection";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
import Sequelize, { Op } from "sequelize";
/**
 * Función para logear el usuario
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
      const updateActividad: any = await initModel.actividad.update(
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

      console.log("recursos", recursos);
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
     // let presupuestoTotalTarea: any = 0;
      let tarea = await initModel.tarea.findOne({
        where: { idTarea: idTarea },
      });
      let presupuestoTarea: any = tarea?.dataValues.presupuesto;
      let presupuestoTotalTarea :any =
        parseFloat(presupuestoTarea) - parseFloat(presupuestoRecurso);
      presupuestoTotalTarea = parseFloat(presupuestoTotalTarea) + parseFloat(presupuesto);
     // console.log("soy el presupuestoTotalTarea", presupuestoTotalTarea,presupuesto)
      let presupuestoTareaUpdate = {
        presupuesto: presupuestoTotalTarea,
      };

      await initModel.tarea.update(presupuestoTareaUpdate, {
        where: { idTarea: idTarea },
      });
      /********************************************************************* */
      //let presupuestoTotalActividad: any = 0;
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